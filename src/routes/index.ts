import { Router } from "express";
import authRoutes from "./authRouter";
import productsRoutes from "./productsRouter";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);

export default rootRouter;
