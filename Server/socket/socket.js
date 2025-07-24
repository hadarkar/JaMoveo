// server/socket/socket.js
import { Server } from "socket.io";
import Session from "../models/Session.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    // בקשת סטטוס סשן קיים
    socket.on("requestSessionStatus", async () => {
      try {
        const session = await Session.findOne();
        const hasActiveSession = !!(session && session.song);
        socket.emit("sessionStatus", { hasActiveSession });
      } catch (err) {
        console.error("❌ Error in requestSessionStatus:", err);
        socket.emit("sessionStatus", { hasActiveSession: false });
      }
    });

    socket.on("songSelected", async ({ song }) => {
      try {
        console.log("🎵 songSelected received from client:", song);

        const session = await Session.findOne();
        if (!session) {
          socket.emit("error", "⚠️ No active session found.");
          return;
        }

        session.song = song;
        session.startedAt = new Date();
        await session.save();

        console.log("✅ Session updated with song:", song.title);

        io.emit("navigateToLive", song);
      } catch (err) {
        console.error("❌ Error handling songSelected:", err);
        socket.emit("error", "🚨 Failed to start session.");
      }
    });

    socket.on("joinSession", async (sessionId) => {
      try {
        const session =
          sessionId === "singleton"
            ? await Session.findOne()
            : await Session.findById(sessionId);

        if (!session) return;

        socket.join(session._id.toString());
        console.log(`➡ ${socket.id} joined session ${session._id}`);

        if (session.startedAt && session.song) {
          socket.emit("songStarted", {
            sessionId: session._id.toString(),
            song: session.song,
          });
        }
      } catch (err) {
        console.error("❌ Error in joinSession:", err);
      }
    });

    socket.on("quitSession", async () => {
      try {
        const session = await Session.findOne();
        if (session) {
          await session.deleteOne();
          console.log("🧹 Session deleted by admin.");
          io.emit("sessionEnded");
        }
      } catch (err) {
        console.error("❌ Error deleting session:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
};

export { io };
