import express from "express";
import {
  registerCustomer,
  loginCustomer,
  googleLogin,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount,
} from "../controllers/customer.controller.js";

import { customerProtect } from "../middleware/customer.middleware.js";

const router = express.Router();

// Public
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected
router.get("/me", customerProtect, getProfile);
router.put("/me", customerProtect, updateProfile);
router.put("/change-password", customerProtect, changePassword);
router.delete("/me", customerProtect, deleteAccount);

export default router;
