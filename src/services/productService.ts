import { ProductRepository } from "../repository/productRepository";
import { CreateProductSchema } from "../schema/productSchema";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorCode } from "../constants/errorCode";
import { ErrorMessageProduct } from "../constants/errorMessage";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData: any) {
    const { name, description, price, quantity, image } =
      CreateProductSchema.parse(productData);

    const imageBuffer: Uint8Array = image
      ? new Uint8Array(Buffer.from(image.split(",")[1], "base64"))
      : new Uint8Array();

    const newProduct = await this.productRepository.create({
      name,
      description,
      price,
      quantity,
      image: imageBuffer,
    });

    return newProduct;
  }

  async deleteProduct(id: number) {
    const existingProduct = await this.productRepository.getById(id);

    if (!existingProduct) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    await this.productRepository.delete(id);
  }

  async listProduct() {
    return await this.productRepository.list();
  }

  async getProductById(id: number) {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    return product;
  }

  async updateProductQuantity(id: number, body: any) {
    const { quantity, updateQuantity } = body;
    const existingProduct = await this.productRepository.getById(id);

    if (!existingProduct) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    let updatedQuantity = existingProduct.quantity;

    if (quantity !== undefined) {
      if (updateQuantity === "add") {
        updatedQuantity += quantity;
      } else if (updateQuantity === "remove") {
        if (quantity > existingProduct.quantity) {
          throw new ErrorResponse(
            ErrorMessageProduct.INSUFFICIENT_STOCK,
            ErrorCode.BAD_REQUEST
          );
        }
        updatedQuantity = Math.max(updatedQuantity - quantity, 0);
      }
    }

    return await this.productRepository.update(id, {
      quantity: updatedQuantity,
    });
  }

  async updateProduct(id: number, body: any) {
    const { name, description, price, quantity, image } = body;

    const existingProduct = await this.productRepository.getById(id);

    if (!existingProduct) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    let imageBuffer = existingProduct.image;
    if (image) {
      const base64Image = image.split(",")[1];
      imageBuffer = Buffer.from(base64Image, "base64");
    }

    return await this.productRepository.update(id, {
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price || existingProduct.price,
      quantity: quantity !== undefined ? quantity : existingProduct.quantity,
      image: imageBuffer,
    });
  }
}
