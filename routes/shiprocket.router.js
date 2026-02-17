// src/routes/shiprocket.router.js
import express from "express";
import { calculateShipping } from "../controllers/shiprocket.controller.js";

const router = express.Router();

// POST /api/v4/shiprocket/calculate-shipping
router.post("/calculate-shipping", calculateShipping);

export default router;
