import express from "express";
import {
  createOrder,
  getAllOrders,
  trackOrder, // renamed (important)
  getOrderById,
  deleteOrder,
  deleteMultipleOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// Customer
router.post("/", createOrder);

// Admin
router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/bulk-delete", deleteMultipleOrders);

// Public / Customer
router.get("/track", trackOrder); // phone/email tracking
router.get("/:id", getOrderById); // order id tracking

export default router;
