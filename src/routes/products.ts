import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  listProduct,
  getProductById,
  updateProduct,     
  updateProductQuantity, 
} from "../controllers/products";
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();


productsRoutes.post("/", errorHandler(createProduct));
productsRoutes.delete("/:id", errorHandler(deleteProduct));
productsRoutes.get("/", errorHandler(listProduct));
productsRoutes.get("/:id", errorHandler(getProductById));
productsRoutes.put("/:id", errorHandler(updateProduct));
productsRoutes.patch("/:id/quantity", errorHandler(updateProductQuantity));

export default productsRoutes;
