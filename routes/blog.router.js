import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Admin Only
router.post("/", protect, adminOnly, createBlog);
router.put("/:slug", protect, adminOnly, updateBlog);
router.delete("/:slug", protect, adminOnly, deleteBlog);

export default router;
