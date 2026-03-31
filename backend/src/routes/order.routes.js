import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js";
import {
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

// Admin Routes
router.get("/admin", authenticate, authorizeAdmin, getAllOrders);
router.put("/admin/:id/status", authenticate, authorizeAdmin, updateOrderStatus);

// User Routes
router.get("/my", authenticate, getMyOrders);

export default router;