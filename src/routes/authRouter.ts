import { Router } from "express";
import { login, validToken, signup } from "../controllers/userController";


const authRoutes: any = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/me", validToken);

export default authRoutes;
