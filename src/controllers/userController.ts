import { Request, Response } from "express";
import { AuthService } from "../services/userServices";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorMessage } from "../constants/errorMessage";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.signup({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    if(error instanceof ErrorResponse){
      return error.sendResponse(res);
    }
    res.status(500).json({errorMessage: ErrorMessage.INTERNAL_EXCEPTION})
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login({ email, password });
    res.status(200).json(response);
  } catch (error: any) {
    if(error instanceof ErrorResponse){
      return error.sendResponse(res);
    }
    res.status(500).json({errorMessage: ErrorMessage.INTERNAL_EXCEPTION})
  }
};

export const validToken = async (req: Request, res: Response) => {
  res.status(200).json(req.body.user);
};
