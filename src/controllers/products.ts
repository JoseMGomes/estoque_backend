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
