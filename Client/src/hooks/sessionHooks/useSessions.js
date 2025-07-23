// 📁 hooks/sessionHooks/useSessions.js
import { useState, useEffect, useCallback } from "react";
import {
  fetchSessionsApi,
  createSessionApi,
  joinSessionApi,
  startSessionApi,
} from "./useSessionApi";
import { useSessionSocket } from "./useSessionSocket";

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
      await createSessionApi();
    } catch (err) {
      console.error("❌ Failed to create session:", err);
      alert("Failed to create session.");
    }
  }, []);

  const joinSession = useCallback(async (sessionId) => {
    try {
      await joinSessionApi(sessionId);
      alert("✅ Joined session!");
    } catch (err) {
      console.error("❌ Failed to join session:", err);
      alert("Failed to join session.");
    }
  }, []);

  const startSession = useCallback(async (sessionId) => {
    try {
      await startSessionApi(sessionId);
      alert("🎵 Session started!");
      fetchSessions();
    } catch (err) {
      console.error("❌ Failed to start session", err);
      alert("Failed to start session.");
    }
  }, [fetchSessions]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useSessionSocket(setSessions);

  return {
    sessions,
    loading,
    fetchSessions,
    createSession,
    joinSession,
    startSession,
  };
};
