import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index";
import { CreateProductSchema } from "../schema/products";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price, quantity, image } =
      CreateProductSchema.parse(req.body);

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

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const existingProduct = await prismaClient.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      throw new BadRequestException("Product not found.", ErrorCode.NOT_FOUND);
    }

    await prismaClient.product.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await prismaClient.product.findMany();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prismaClient.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new BadRequestException("Product not found.", ErrorCode.NOT_FOUND);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity, updateQuantity } = req.body;

    const existingProduct = await prismaClient.product.findUnique({
      where: { id: Number(id) },
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

    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(id) },
      data: {
        quantity: updatedQuantity,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, image } = req.body;

    const existingProduct = await prismaClient.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      throw new BadRequestException("Product not found", ErrorCode.NOT_FOUND);
    }

    let imageBuffer = existingProduct.image;
    if (image) {
      const base64Image = image.split(",")[1];
      imageBuffer = Buffer.from(base64Image, "base64");
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(id) },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
        quantity: quantity !== undefined ? quantity : existingProduct.quantity,
        image: imageBuffer,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
