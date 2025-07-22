import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useSessions = (user) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:3001/api/sessions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSessions(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch sessions:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createSession = useCallback(async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/sessions",
        { name: "New Jam Session" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSessions((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("❌ Failed to create session:", err);
      alert("Failed to create session.");
    }
  }, []);

  const joinSession = useCallback(
    async (sessionId) => {
      try {
        await axios.post(
          `http://localhost:3001/api/sessions/${sessionId}/join`,
          { userId: user._id }, // ✅ כאן התיקון
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("✅ Joined session!");
      } catch (err) {
        console.error("❌ Failed to join session:", err);
        alert("Failed to join session.");
      }
    },
    [user]
  );

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    fetchSessions,
    createSession,
    joinSession,
  };
};
