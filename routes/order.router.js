import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder); // Place new order
router.get("/", getAllOrders); // Fetch all orders

export default router;
