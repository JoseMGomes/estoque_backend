import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  listProductController,
  getProductByIdController,
  updateProductController,
  updateProductQuantityController,
} from "../controllers/productsController";
import { errorHandler } from "../error-handler";

const productsRoutes: Router = Router();

productsRoutes.post("/", errorHandler(createProductController));
productsRoutes.delete("/:id", errorHandler(deleteProductController));
productsRoutes.get("/", errorHandler(listProductController));
productsRoutes.get("/:id", errorHandler(getProductByIdController));
productsRoutes.put("/:id", errorHandler(updateProductController));
productsRoutes.patch(
  "/:id/quantity",
  errorHandler(updateProductQuantityController)
);

export default productsRoutes;
