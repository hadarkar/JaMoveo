import Session from "../models/Session.js";
import { io } from "../socket/socket.js"; // ✅ ייבוא ה־io לצורך שידור socket

// ✅ יצירת סשן חדש, שמירתו במסד הנתונים + שידור socket לכל המשתמשים
export const createNewSession = async (name, userId) => {
  const session = new Session({
    name,
    createdBy: userId,
    participants: [],
  });
  await session.save();

  // ✅ משדר את הסשן החדש לכל המשתמשים
  io.emit("sessionCreated", session);

  return session;
};

// ✅ בודק אם המשתמש הוא יוצר הסשן
export const isSessionOwner = (session, userId) =>
  session.createdBy.toString() === userId;

// ✅ משדר התחלת שיר דרך socket.io
export const emitSongStart = (io, session) => {
  io.emit("songStarted", {
    sessionId: session._id,
    song: {
      title: "Rock On",
      chords: ["Em", "C", "G", "D"],
    },
  });
};
