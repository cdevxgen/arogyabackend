import express from "express";
import {
  registerAdmin,
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Admin Only
router.post("/register-admin", protect, adminOnly, registerAdmin);
router.post("/register-user", protect, adminOnly, registerUser);
router.get("/all-users", protect, adminOnly, getAllUsers);

// 👉 NEW: Update & Delete User
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

// OTP (Public)
router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);

export default router;
