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
    CreateProductSchema.parse(req.body);

    const { name, description, price, image, quantity } = req.body;

    //
    let existingProduct = await prismaClient.product.findUnique({
      where: { name },
    });

    if (existingProduct) {
      throw new BadRequestException(
        "Product with the same name already exists.",
        ErrorCode.ALREADY_EXISTS
      );
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price,
        image,
        quantity,
      },
    });

    res.json({ product });
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


export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, image, quantity } = req.body;

    if (!name || !description || price === undefined || !image || quantity === undefined) {
      throw new BadRequestException("Missing required fields", ErrorCode.BAD_REQUEST);
    }

    const existingProduct = await prismaClient.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      throw new BadRequestException("Product not found", ErrorCode.NOT_FOUND);
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
        image,
        quantity,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};


