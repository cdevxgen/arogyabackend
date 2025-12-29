import express from "express";
import {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/", createCoupon); // Create coupon
router.get("/", getAllCoupons); // View all coupons
router.put("/:id", updateCoupon); // Update coupon
router.delete("/:id", deleteCoupon); // Delete coupon
router.post("/apply", applyCoupon); // Apply at checkout

export default router;
