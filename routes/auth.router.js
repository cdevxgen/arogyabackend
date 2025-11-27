import express from "express";
import {
  registerAdmin,
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  getAllUsers, // ✅ import new controller
} from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Public routes
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Protected: only admin can use
router.post("/register-admin", protect, adminOnly, registerAdmin);
router.post("/register-user", protect, adminOnly, registerUser);

// ✅ Get all users/admins
router.get("/all-users", protect, adminOnly, getAllUsers);

export default router;
