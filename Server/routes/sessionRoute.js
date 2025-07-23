import express from "express";
import * as sessionController from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", sessionController.createSession);
router.get("/", sessionController.getAllSessions);
router.post("/:id/join", sessionController.joinSession);
router.post("/:id/start", sessionController.startSession);

export default router;
