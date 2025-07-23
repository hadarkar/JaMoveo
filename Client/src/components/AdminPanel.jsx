// src/components/AdminPanel.jsx
import React from "react";
import { useSessions } from "../hooks/sessionHooks/useSessions";
import { useAuth } from "../hooks/useAuth";

const AdminPanel = () => {
  const { user } = useAuth();
  const {
    sessions,
    loading,
    createSession,
    startSession,
  } = useSessions(user);

  // --- Debug: בדיקת הצורה של user ושל רשימת הסשנים
  console.log("Current user:", user);
  console.log("Sessions list:", sessions);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={createSession}
      >
        ➕ Create New Session
      </button>

      <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions yet.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => {
            // 1. גזור את המזהה של ה‑creator (יכול להגיע כ־string או כאובייקט עם _id)
            const creatorId = typeof s.createdBy === "string"
              ? s.createdBy
              : s.createdBy?._id;
            // 2. קבל את המזהה של המשתמש (יכול להיות user._id או user.id)
            const currentUserId = user._id || user.id;
            // 3. בדוק אם המשתמש הוא בעל הסשן
            const isOwner = creatorId === currentUserId;

            return (
              <li
                key={s._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{s.name}</span>
                {isOwner && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => startSession(s._id)}
                  >
                    ▶ Start Session
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
