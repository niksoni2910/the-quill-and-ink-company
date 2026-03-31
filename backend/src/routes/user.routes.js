import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  getMe,
  updateMe,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateMe);

export default router;