import { useState, useEffect } from "react";
import { socket } from "./sessionHooks/sessionSocketInstance";

export const useLiveSong = (sessionId) => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    if (!sessionId) return;
    if (!socket.connected) socket.connect();

    socket.emit("joinSession", sessionId);

    socket.on("songStarted", ({ song }) => {
      setSong(song);
    });

    return () => {
      socket.off("songStarted");
    };
  }, [sessionId]);

  return { song };
};
