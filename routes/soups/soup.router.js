import express from "express";
import {
  createSoup,
  getAllSoups,
  getSoupById,
  updateSoup,
  deleteSoup,
} from "../../controllers/soups/soup.controller.js";

const router = express.Router();

router.post("/", createSoup);
router.get("/", getAllSoups);
router.get("/:id", getSoupById);
router.put("/:id", updateSoup);
router.delete("/:id", deleteSoup);

export default router;
