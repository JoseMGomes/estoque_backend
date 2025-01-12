import { NextFunction, Request, Response } from "express";
import { HttpExceptions, ErrorCode } from "./../exceptions/root";

export const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? ErrorCode.INTERNAL_EXCEPTION;
  const errorCode = error.errorCode ?? ErrorCode.INTERNAL_EXCEPTION;
  const message = error.message || "Erro interno do servidor";

  res.status(statusCode).json({
    message,
    errorCode,
    errors: error.errors || null,
  });
};
