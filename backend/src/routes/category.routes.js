import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authenticate, createCategory); // admin

export default router;