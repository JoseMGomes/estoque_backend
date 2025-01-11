import { Router } from "express";
import { createProduct, deleteProduct } from "../controllers/products"; 
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();


productsRoutes.post("/", errorHandler(createProduct));
productsRoutes.delete("/:id", errorHandler(deleteProduct));

export default productsRoutes;
