import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateAddress,
  removeItem,
  checkout,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.put("/address", authenticate, updateAddress);
router.delete("/item/:id", authenticate, removeItem);
router.post("/checkout", authenticate, checkout);

export default router;