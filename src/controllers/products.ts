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
