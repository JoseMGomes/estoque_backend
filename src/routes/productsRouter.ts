import { Router } from "express";
import { ProductController } from "../controllers/productsController";

const productController = new ProductController();
const productsRoutes: any = Router();

productsRoutes.post("/", productController.createProductController.bind(productController));
productsRoutes.get("/", productController.listProductController.bind(productController));
productsRoutes.get("/:id", productController.getProductByIdController.bind(productController));
productsRoutes.delete("/:id", productController.deleteProductController.bind(productController));
productsRoutes.patch("/:id/quantity", productController.updateProductQuantityController.bind(productController));
productsRoutes.put("/:id", productController.updateProductController.bind(productController));

export default productsRoutes;
