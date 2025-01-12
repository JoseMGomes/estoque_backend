import { NextFunction, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  listProduct,
  getProductById,
  updateProductQuantity,
  updateProduct,
} from "../services/productService";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteProduct(Number(req.params.id));
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const listProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await listProduct();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getProductById(Number(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantityController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct = await updateProductQuantity(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedProduct = await updateProduct(Number(req.params.id), req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
