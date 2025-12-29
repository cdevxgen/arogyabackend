import express from "express";
import {
  createReview,
  getApprovedReviews,
  getMyReview,
  getAllReviews,
  getReviewById,
  approveReview,
  rejectReview,
  deleteReview,
  deleteMyReview,
} from "../controllers/review.controller.js";

import { customerProtect } from "../middleware/customer.middleware.js";
import { protect } from "../middleware/auth.middleware.js"; // if you have admin

const router = express.Router();

/* ================= CUSTOMER ================= */

/**
 * CREATE REVIEW
 * POST /api/v4/proreviews
 */
router.post("/", customerProtect, createReview);

/**
 * GET MY REVIEW FOR PRODUCT
 * GET /api/v4/proreviews/my/:productId
 */
router.get("/my/:productId", customerProtect, getMyReview);

/**
 * DELETE MY REVIEW
 * DELETE /api/v4/proreviews/my/:reviewId
 */
router.delete("/my/:reviewId", customerProtect, deleteMyReview);

/* ================= PUBLIC ================= */

/**
 * GET APPROVED REVIEWS FOR PRODUCT
 * GET /api/v4/proreviews/:productId
 */
router.get("/:productId", getApprovedReviews);

/* ================= ADMIN / CHECKING ================= */

/**
 * GET ALL REVIEWS (PENDING / APPROVED / REJECTED)
 * GET /api/v4/proreviews
 */
router.get("/", protect, getAllReviews);

/**
 * GET SINGLE REVIEW
 * GET /api/v4/proreviews/review/:id
 */
router.get("/review/:id", protect, getReviewById);

/**
 * APPROVE REVIEW
 * PUT /api/v4/proreviews/:id/approve
 */
router.put("/:id/approve", protect, approveReview);

/**
 * REJECT REVIEW
 * PUT /api/v4/proreviews/:id/reject
 */
router.put("/:id/reject", protect, rejectReview);

/**
 * DELETE REVIEW (ADMIN)
 * DELETE /api/v4/proreviews/:id
 */
router.delete("/:id", protect, deleteReview);

export default router;
