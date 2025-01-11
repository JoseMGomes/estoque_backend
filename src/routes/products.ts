import { Router } from "express";
import { createProduct, deleteProduct, listProduct } from "../controllers/products"; 
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();


productsRoutes.post("/", errorHandler(createProduct));


productsRoutes.delete("/:id", errorHandler(deleteProduct));


productsRoutes.get("/", errorHandler(listProduct));

export default productsRoutes;
