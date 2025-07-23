import { useEffect } from "react";
import { socket } from "./sessionSocketInstance";

// מאזין ל־sessionCreated ועדכון חיצוני
export const useSessionSocket = (setSessions) => {
  useEffect(() => {
    socket.on("sessionCreated", (newSession) => {
      setSessions((prev) => [...prev, newSession]);
    });

    return () => {
      socket.off("sessionCreated");
    };
  }, [setSessions]);
};
