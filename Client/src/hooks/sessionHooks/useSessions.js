import { useState, useEffect, useCallback } from "react";
import {
  fetchSessionsApi,
  createSessionApi,
  joinSessionApi,
} from "./useSessionApi";
import { useSessionSocket } from "./useSessionSocket";
import { socket } from "./sessionSocketInstance";

export const useSessions = (user) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    if (!user) return;
    try {
      const data = await fetchSessionsApi();
      setSessions(data);
    } catch (err) {
      console.error("❌ Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createSession = useCallback(async () => {
  try {
    const session = await createSessionApi();

    // אם אין עדיין סשן במצב ה־state – נוצר אחד חדש
    if (sessions.length === 0) {
      alert("✅ Session created successfully!");
    } else {
      alert("⚠️ A session already exists.");
    }

    setSessions([session]); // במודל סינגלטון
  } catch (err) {
    console.error("❌ Failed to create session:", err);
    alert("🚨 Failed to create session.");
  }
}, [sessions]);


  const joinSession = useCallback(async (sessionId) => {
    try {
      await joinSessionApi(sessionId);
      if (!socket.connected) socket.connect();
      socket.emit("joinSession", sessionId);
      alert("✅ Joined session!");
    } catch (err) {
      console.error("❌ Failed to join session:", err);
      alert("Failed to join session.");
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useSessionSocket(setSessions);

  return {
    sessions,
    loading,
    createSession,
    joinSession,
  };
};
