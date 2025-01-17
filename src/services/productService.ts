import { ProductRepository } from "../repository/productRepository";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorCode } from "../constants/errorCode";
import { ErrorMessageProduct } from "../constants/errorMessage";
import { ProductData } from "../models/userModels";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData: ProductData) {
    const { name, description, price, quantity, image } = productData;

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
    const listProduct = await this.productRepository.list();
    
    const productsWithBase64Image = listProduct.map(item => {
      if (item.image) {
        const base64Image = Buffer.from(item.image).toString('base64');
        return { ...item, image: `data:image/jpeg;base64,${base64Image}` }; 
      }
      return item;
    });
  
    return productsWithBase64Image;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }
    if (product.image) {
      const base64Image = Buffer.from(product.image).toString('base64');
      return { ...product, image: `data:image/jpeg;base64,${base64Image}` }; 
    }
    return product;
  }

  async updateProductQuantity(id: number, body: any) {
    const { quantity, updateQuantity } = body;
    const existingProduct = await this.productRepository.getById(id);
    let stock = false

    if (!existingProduct) {
      throw new ErrorResponse(ErrorMessageProduct.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    let updatedQuantity = existingProduct.quantity;
    console.log(body)
    if (quantity !== undefined) {
      if (updateQuantity === "add") {
        updatedQuantity += quantity;
        stock = true
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
      is_Stock_entry: stock
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
