import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useSessions } from "../hooks/sessionHooks/useSessions";
import SearchBar from "./SearchBar";

const AdminPanel = () => {
  const { user } = useAuth();
  const {
    sessions,
    loading,
    createSession,
  } = useSessions(user);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-lg space-y-6">

      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-purple-800">
        🎛️ Admin Control Panel
      </h2>

      {/* 🔍 חיפוש שיר ויצירת סשן מתחת */}
      <div className="bg-white/90 p-4 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">🎵 Start a new jam</h3>

        {/* שורת חיפוש */}
        <SearchBar />

        {/* כפתור יצירת סשן מתחת */}
        <div className="flex justify-center">
          <button
            onClick={createSession}
            className="py-2 px-6 rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition duration-300 text-lg font-medium shadow"
          >
            ➕ Create New Session
          </button>
        </div>
      </div>

      {/* 🟢 סשנים פעילים */}
      <div className="bg-white/90 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🟢 Active Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500 italic">No sessions yet.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {sessions.map((s) => (
              <li key={s._id} className="py-2 flex justify-between items-center">
                <span className="font-medium">{s.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
