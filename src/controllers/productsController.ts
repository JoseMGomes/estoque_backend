import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorMessage } from "../constants/errorMessage";
import { CreateProductSchema, UpdateProductSchema } from "../schema/productSchema";
import { z } from "zod";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  private getErrorPath(functionName: string, details: string) {
    return `O erro ocorreu em ${functionName}: ${details}`;
  }

  async createProductController(req: Request, res: Response) {
    try {
    
      const validatedProductData = CreateProductSchema.parse(req.body);
      const newProduct = await this.productService.createProduct(validatedProductData);
      res.status(201).json(newProduct);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errorMessage: "Erro de validação",
          details: error.errors.map(e => ({
            message: e.message,
            path: this.getErrorPath("createProductController", e.path.join(' > ')),
          })),
        });
      }
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      console.error("Internal server error:", error);  
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("createProductController", "Erro interno no servidor"),
      });
    }
  }

  async deleteProductController(req: Request, res: Response) {
    try {
      await this.productService.deleteProduct(Number(req.params.id));
      res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      console.error("Internal server error:", error);
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("deleteProductController", "Erro interno do servidor"),
      });
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
      console.error("Internal server error:", error);
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("listProductController", "Erro interno do servidor"),
      });
    }
  }

  async getProductByIdController(req: Request, res: Response) {
    try {
      const product = await this.productService.getProductById(Number(req.params.id));
      res.status(200).json(product);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      console.error("Internal server error:", error);
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("getProductByIdController", "Erro interno do servidor"),
      });
    }
  }

  async updateProductQuantityController(req: Request, res: Response) {
    try {
      const updatedProduct = await this.productService.updateProductQuantity(Number(req.params.id), req.body);
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      console.error("Internal server error:", error);
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("updateProductQuantityController", "Erro interno do servidor"),
      });
    }
  }

  async updateProductController(req: Request, res: Response) {
    try {
      const validatedUpdateData = UpdateProductSchema.parse(req.body);
      const updatedProduct = await this.productService.updateProduct(Number(req.params.id), validatedUpdateData);
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errorMessage: "Erro de validação",
          details: error.errors.map(e => ({
            message: e.message,
            path: this.getErrorPath("updateProductController", e.path.join(' > ')),
          })),
        });
      }
      if (error instanceof ErrorResponse) {
        return error.sendResponse(res);
      }
      console.error("Internal server error:", error);
      res.status(500).json({
        errorMessage: ErrorMessage.INTERNAL_EXCEPTION,
        path: this.getErrorPath("updateProductController", "Erro interno do servidor"),
      });
    }
  }
}
