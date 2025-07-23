// src/hooks/useLiveSong.js
import { useState, useEffect } from "react";
import { socket } from "./sessionHooks/sessionSocketInstance"; // ✅ שימוש ב־socket גלובלי

export const useLiveSong = () => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    // האזנה להגעת שיר
    socket.on("songStarted", (data) => {
      setSong(data.song);
    });

    return () => {
      socket.off("songStarted");
    };
  }, []);

  return { song };
};
