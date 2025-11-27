import express from "express";
import {
  createOrder,
  getAllOrders,
  trackOrder,
  getOrderById,
  deleteOrder,
  deleteMultipleOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder); // Place new order
router.get("/", getAllOrders); // Fetch all orders

router.get("/track", trackOrder);
router.get("/:id", getOrderById);

router.delete("/:id", deleteOrder);

router.post("/bulk-delete", deleteMultipleOrders);

export default router;
