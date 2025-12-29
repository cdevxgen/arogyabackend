import express from "express";
import {
  createReview,
  getApprovedReviews,
  getMyReview,
} from "../controllers/review.controller.js";

import { customerProtect } from "../middleware/customer.middleware.js";

const router = express.Router();

/**
 * Customer creates review
 */
router.post("/", customerProtect, createReview);

/**
 * Public: get approved reviews for product
 */
router.get("/:productId", getApprovedReviews);

/**
 * Customer: get my review for product
 */
router.get("/my/:productId", customerProtect, getMyReview);

export default router;
