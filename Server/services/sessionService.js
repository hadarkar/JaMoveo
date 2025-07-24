import Session from "../models/Session.js";
import { io } from "../socket/socket.js";

/**
 * יצירת סשן סינגלטון – אם קיים סשן, מחזיר אותו במקום ליצור חדש
 */
export const createSingletonSession = async (userId) => {
  let session = await Session.findOne();
  if (session) return session;

  session = new Session({
    name: "Jamoveo Session",
    createdBy: userId,
    participants: [],
    startedAt: null,
  });

  await session.save();
  session = await session.populate("createdBy", "_id username");

  io.emit("sessionCreated", session);
  return session;
};

/**
 * בודק אם המשתמש הוא יוצר הסשן
 */
export const isSessionOwner = (session, userId) =>
  session.createdBy.toString() === userId;

/**
 * שידור התחלת שיר
 */
export const emitSongStart = (session) => {
  const sessionId = session._id.toString();

  const songPayload = session.song || {
    title: "Rock On",
    chords: ["Em", "C", "G", "D"],
  };

  io.to(sessionId).emit("songStarted", {
    sessionId,
    song: songPayload,
  });

  io.emit("sessionStarted", session);
};
