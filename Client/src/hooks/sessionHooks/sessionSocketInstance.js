import { io as clientIo } from "socket.io-client";

export const socket = clientIo("http://localhost:3001", {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.error("Socket connect error:", err);
});
