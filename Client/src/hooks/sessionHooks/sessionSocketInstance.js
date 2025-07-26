import { io as clientIo } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export const socket = clientIo(API_URL, {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.error("Socket connect error:", err);
});
