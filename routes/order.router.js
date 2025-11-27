import express from "express";
import {
  createOrder,
  getAllOrders,
  trackOrder,
  getOrderById,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder); // Place new order
router.get("/", getAllOrders); // Fetch all orders

router.get("/track", trackOrder);
router.get("/:id", getOrderById);

export default router;
