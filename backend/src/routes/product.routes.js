import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct); // auth removed temporarily for testing
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct); // auth removed temporarily for testing
router.delete("/:id", deleteProduct); // auth removed temporarily for testing

export default router;