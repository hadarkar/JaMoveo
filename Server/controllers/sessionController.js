import Session from "../models/Session.js";
import * as sessionService from "../services/sessionService.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { io } from "../socket/socket.js";

// יצירת סשן (admin בלבד)
export const createSession = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const { name } = req.body;
      const user = req.user;

      const session = await sessionService.createNewSession(name, user.id);
      res.status(201).json(session);
    } catch (err) {
      console.error("❌ Failed to create session:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// שליפת כל הסשנים (authenticated בלבד)
export const getAllSessions = [
  verifyToken,
  async (req, res) => {
    try {
      const sessions = await Session.find().populate("createdBy", "_id username role");
      res.status(200).json(sessions);
    } catch (err) {
      console.error("❌ Failed to get sessions:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// הצטרפות לסשן
export const joinSession = [
  verifyToken,
  async (req, res) => {
    const sessionId = req.params.id;
    const userId = req.user.id;

    try {
      const session = await Session.findById(sessionId);
      if (!session) return res.status(404).json({ message: "Session not found" });

      if (session.participants.includes(userId)) {
        return res.status(400).json({ message: "User already joined" });
      }

      session.participants.push(userId);
      await session.save();
      res.status(200).json(session);
    } catch (err) {
      console.error("❌ Failed to join session:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// התחלת סשן (admin היוצר בלבד)
export const startSession = [
  verifyToken,
  async (req, res) => {
    const sessionId = req.params.id;
    const userId = req.user.id;

    try {
      const session = await Session.findById(sessionId);
      if (!session) return res.status(404).json({ message: "Session not found" });

      if (!sessionService.isSessionOwner(session, userId)) {
        return res.status(403).json({ message: "Only the creator can start the session" });
      }

      session.startedAt = new Date();
      await session.save();

      // שידור התחלת שיר למשתמשים דרך Socket.IO
      sessionService.emitSongStart(io, session);

      res.status(200).json({ message: "Session started", session });
    } catch (err) {
      console.error("❌ Failed to start session:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];
