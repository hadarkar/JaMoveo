import { Server } from "socket.io";
import Session from "../models/Session.js";
import * as sessionService from "../services/sessionService.js";

let io;
export const initSocket = (server) => {
  io = new Server(server, { cors: { origin: "*", methods: ["GET","POST"] } });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("joinSession", async (sessionId) => {
      socket.join(sessionId);
      console.log(`➡ ${socket.id} joined room ${sessionId}`);

      // אם הסשן כבר התחיל – שלח את השיר גם למצטרף החדש
      const session = await Session.findById(sessionId);
      if (session?.startedAt) {
        // השתמש בפרטי השיר ששמרת, או בדוגמה סטטית:
        const song = session.song || { title: "Rock On", chords: ["Em","C","G","D"] };
        socket.emit("songStarted", { sessionId, song });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

export { io };
