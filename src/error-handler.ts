import { Request, Response, NextFunction, RequestHandler } from "express";
import { ErrorCode, HttpExceptions } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpExceptions;
      if (error instanceof HttpExceptions) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
