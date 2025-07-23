// server/controllers/sessionController.js

import Session from "../models/Session.js";
import * as sessionService from "../services/sessionService.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

/**
 * יצירת סשן (Admin בלבד)
 */
export const createSession = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const { name } = req.body;
      // יוצרים סשן חדש ושולחים אירוע sessionCreated
      const session = await sessionService.createNewSession(name, req.user.id);
      return res.status(201).json(session);
    } catch (err) {
      console.error("❌ Failed to create session:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
];

/**
 * קבלת כל הסשנים
 */
export const getAllSessions = [
  verifyToken,
  async (req, res) => {
    try {
      const sessions = await Session.find()
        .populate("createdBy", "_id username")
        .populate("participants", "_id username");
      return res.status(200).json(sessions);
    } catch (err) {
      console.error("❌ Failed to get sessions:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
];

/**
 * הצטרפות לסשן
 */
export const joinSession = [
  verifyToken,
  async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      if (!session.participants.includes(req.user.id)) {
        session.participants.push(req.user.id);
        await session.save();
      }

      return res.status(200).json(session);
    } catch (err) {
      console.error("❌ Failed to join session:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
];

/**
 * התחלת הסשן (Admin בלבד), שמירת הזמן ושליחת אירועים דרך Socket.IO
 */
export const startSession = [
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const sessionId = req.params.id;
      const userId = req.user.id;

      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      // רק מי שיצר את הסשן יכול להתחיל אותו
      if (!sessionService.isSessionOwner(session, userId)) {
        return res.status(403).json({ message: "Only the creator can start the session" });
      }

      // עדכון זמן התחלה ושמירה
      session.startedAt = new Date();
      await session.save();

      // שידור התחלת השיר וסטטוס הסשן המעודכן
      sessionService.emitSongStart(session);

      return res.status(200).json({ message: "Session started", session });
    } catch (err) {
      console.error("❌ Failed to start session:", err);
      return res.status(500).json({ message: "Server error" });
    }
  },
];
