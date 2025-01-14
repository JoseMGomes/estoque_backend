import { Router } from "express";
import { login, validToken, signup } from "../controllers/userController";
import authMiddleware from "../middlewares/userMiddlewares";

const authRoutes: any = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/me", authMiddleware, validToken); 

export default authRoutes;
