import express from "express";
import {
  createMalt,
  getAllMalts,
  updateMalt,
  deleteMalt,
} from "../../controllers/soups/malt.controller.js";

const router = express.Router();

router.post("/", createMalt);
router.get("/", getAllMalts);
router.put("/:id", updateMalt);
router.delete("/:id", deleteMalt);

export default router;
