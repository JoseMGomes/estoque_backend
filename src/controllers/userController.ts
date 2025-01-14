import { Request, Response } from "express";
import { AuthService } from "../services/userServices";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorMessage } from "../constants/errorMessage";
import { LoginSchema, SignUpSchema, TokenUserSchema } from "../schema/userSchema";
import { z } from "zod";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = SignUpSchema.parse(req.body);
    const { email, password, name } = validatedData;
    const user = await authService.signup({ name, email, password });

    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errorMessage: "Erro de validação",
        details: error.errors.map(e => ({
          message: e.message,
          path: e.path.join(" > "),
        })),
      });
    }
    if (error instanceof ErrorResponse) {
      return error.sendResponse(res);
    }
    res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = LoginSchema.parse(req.body);

    const { email, password } = validatedData;
    const response = await authService.login({ email, password });

    res.status(200).json(response);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errorMessage: "Erro de validação",
        details: error.errors.map(e => ({
          message: e.message,
          path: e.path.join(" > "),
        })),
      });
    }
    if (error instanceof ErrorResponse) {
      return error.sendResponse(res);
    }
    res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
  }
};


export const validToken = async (req: Request, res: Response) => {
  try {
   
    TokenUserSchema.parse(req.body.user); 

    res.status(200).json(req.body.user);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errorMessage: "Erro de validação no token",
        details: error.errors.map(e => ({
          message: e.message,
          path: e.path.join(" > "),
        })),
      });
    }
    res.status(500).json({ errorMessage: ErrorMessage.INTERNAL_EXCEPTION });
  }
};