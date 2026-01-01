import express from "express";
import {
  createQuoteRequest,
  getAllQuoteRequests,
  getSingleQuoteRequest,
  updateQuoteStatus,
  deleteQuoteRequest,
} from "../controllers/quoteRequest.controller.js";

const router = express.Router();

/**
 * Public
 */
router.post("/", createQuoteRequest);

/**
 * Admin (protect later with middleware)
 */
router.get("/", getAllQuoteRequests);
router.get("/:id", getSingleQuoteRequest);
router.patch("/:id", updateQuoteStatus);
router.delete("/:id", deleteQuoteRequest);

export default router;
