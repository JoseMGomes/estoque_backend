import { Router } from "express";
import { createProduct } from "../controllers/products";
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();

productsRoutes.post("/", errorHandler(createProduct));

export default productsRoutes;
