import { prismaClient } from "../index";
import { CreateProductSchema } from "../schema/productSchema";
import { BadRequestException } from "../exceptions/badRequestException";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (productData: any) => {
  const { name, description, price, quantity, image } =
    CreateProductSchema.parse(productData);

  const imageBuffer: Uint8Array = image
    ? new Uint8Array(Buffer.from(image.split(",")[1], "base64"))
    : new Uint8Array();

  const newProduct = await prismaClient.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      image: imageBuffer,
    },
  });

  return newProduct;
};

export const deleteProduct = async (id: number) => {
  const existingProduct = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new BadRequestException("Product not found.", ErrorCode.NOT_FOUND);
  }

  await prismaClient.product.delete({
    where: { id },
  });
};

export const listProduct = async () => {
  return await prismaClient.product.findMany();
};

export const getProductById = async (id: number) => {
  const product = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new BadRequestException("Product not found.", ErrorCode.NOT_FOUND);
  }

  return product;
};

export const updateProductQuantity = async (id: number, body: any) => {
  const { quantity, updateQuantity } = body;

  const existingProduct = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new BadRequestException("Product not found.", ErrorCode.NOT_FOUND);
  }

  let updatedQuantity = existingProduct.quantity;

  if (quantity !== undefined) {
    if (updateQuantity === "add") {
      updatedQuantity += quantity;
    } else if (updateQuantity === "remove") {
      if (quantity > existingProduct.quantity) {
        throw new BadRequestException(
          "Insufficient stock to remove the requested quantity.",
          ErrorCode.BAD_REQUEST
        );
      }
      updatedQuantity = Math.max(updatedQuantity - quantity, 0);
    }
  }

  return await prismaClient.product.update({
    where: { id },
    data: {
      quantity: updatedQuantity,
    },
  });
};

export const updateProduct = async (id: number, body: any) => {
  const { name, description, price, quantity, image } = body;

  const existingProduct = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new BadRequestException("Product not found", ErrorCode.NOT_FOUND);
  }

  let imageBuffer = existingProduct.image;
  if (image) {
    const base64Image = image.split(",")[1];
    imageBuffer = Buffer.from(base64Image, "base64");
  }

  return await prismaClient.product.update({
    where: { id },
    data: {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price || existingProduct.price,
      quantity: quantity !== undefined ? quantity : existingProduct.quantity,
      image: imageBuffer,
    },
  });
};
