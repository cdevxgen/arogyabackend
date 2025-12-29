import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  searchProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

// /api/v4/products
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/slug/:slug", getProductBySlug); // 🔥 Get by slug
router.get("/search", searchProducts);

export default router;
