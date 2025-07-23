import { useEffect } from "react";
import { socket } from "./sessionSocketInstance";

export const useSessionSocket = (setSessions) => {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("sessionCreated", (newSession) => {
      setSessions((prev) => [...prev, newSession]);
    });

    socket.on("sessionStarted", (updatedSession) => {
      setSessions((prev) =>
        prev.map((s) =>
          s._id === updatedSession._id ? updatedSession : s
        )
      );
    });

    return () => {
      socket.off("sessionCreated");
      socket.off("sessionStarted");
    };
  }, [setSessions]);
};
