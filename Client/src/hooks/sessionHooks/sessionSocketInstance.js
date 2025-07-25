import { io as clientIo } from "socket.io-client";
import SERVER_URL from "../../config.js";

export const socket = clientIo(SERVER_URL, {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err);
});
