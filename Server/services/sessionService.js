import Session from "../models/Session.js";
import { io } from "../socket/socket.js";

/**
 * יוצר סשן חדש, משדר לכולם את יצירתו ומחזיר את האובייקט המלא עם populate
 */
export const createNewSession = async (name, userId) => {
  let session = new Session({
    name,
    createdBy: userId,
    participants: [],
    startedAt: null,
  });
  await session.save();
  // populate כדי שישלח גם createdBy._id ו־username
  session = await session.populate("createdBy", "_id username");

  // משדר גלובלית על סשן חדש
  io.emit("sessionCreated", session);
  return session;
};

/**
 * בודק אם המשתמש הוא יוצר הסשן
 */
export const isSessionOwner = (session, userId) =>
  session.createdBy.toString() === userId;

/**
 * שידור התחלת השיר: גם לחדר הספציפי (עם sessionId בפייל־לוד)
 * וגם גלובלית עדכון סטטוס sessionStarted
 */
export const emitSongStart = (session) => {
  const sessionId = session._id.toString();

  // אם ב־session נשמר song – השתמש בו, אחרת – דוגמה סטטית
  const songPayload = session.song || {
    title: "Rock On",
    chords: ["Em", "C", "G", "D"],
  };

  // שולח לחדר המתאים גם את ה־sessionId וגם את הפרטים של השיר
  io.to(sessionId).emit("songStarted", {
    sessionId,
    song: songPayload,
  });

  // משדר גם אירוע גלובלי ל־sessionStarted כדי לעדכן UI
  io.emit("sessionStarted", session);
};
