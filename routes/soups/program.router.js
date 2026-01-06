import express from "express";
import {
  getProgram,
  updateProgram,
} from "../../controllers/soups/program.controller.js";

const router = express.Router();

router.get("/", getProgram);
router.put("/", updateProgram);

export default router;
