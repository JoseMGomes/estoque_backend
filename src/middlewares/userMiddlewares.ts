import { NextFunction, Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorCode } from "../constants/errorCode";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
      throw new ErrorResponse("Token não fornecido", ErrorCode.UNAUTHORIZED)
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      
       throw new ErrorResponse(
          "Usuário não encontrado",
          ErrorCode.UNAUTHORIZED
        
      );
      
    }
    req.body.user = user;
    next();
  } catch (error) {
    throw new ErrorResponse("Token inválido", ErrorCode.UNAUTHORIZED);
  }
};

export default authMiddleware;
