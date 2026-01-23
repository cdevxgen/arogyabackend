import express from "express";
import {
  createBulkRequest,
  getAllBulkRequests,
  getBulkRequestById,
  updateBulkRequest,
  deleteBulkRequest,
} from "../controllers/bulkRequest.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/* CREATE */
router.post("/", protect, createBulkRequest);

/* READ */
router.get("/", protect, adminOnly, getAllBulkRequests);
router.get("/:id", protect, getBulkRequestById);

/* UPDATE */
router.put("/:id", protect, adminOnly, updateBulkRequest);

/* DELETE */
router.delete("/:id", protect, adminOnly, deleteBulkRequest);

export default router;
