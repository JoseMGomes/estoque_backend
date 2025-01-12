import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorMessage } from "../constants/errorMessage";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async createProductController(req: Request, res: Response) {
    try {
      const newProduct = await this.productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async deleteProductController(req: Request, res: Response) {
    try {
      await this.productService.deleteProduct(Number(req.params.id));
      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async listProductController(req: Request, res: Response) {
    try {
      const products = await this.productService.listProduct();
      res.status(200).json(products);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async getProductByIdController(req: Request, res: Response) {
    try {
      const product = await this.productService.getProductById(
        Number(req.params.id)
      );
      res.status(200).json(product);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async updateProductQuantityController(req: Request, res: Response) {
    try {
      const updatedProduct = await this.productService.updateProductQuantity(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }

  async updateProductController(req: Request, res: Response) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
    }
  }
}
