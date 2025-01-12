import { NextFunction, Request, Response } from "express";
import { signupService, loginService } from "../services/authServices";
import { SignUpSchema } from "../schema/userSchema";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;

    const user = await signupService(email, password, name);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginService(email, password);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  res.json(req.body.user);
};
