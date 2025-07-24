import React from "react";
import { useAuth }     from "../hooks/useAuth";
import { useSessions } from "../hooks/sessionHooks/useSessions";
import SearchBar       from "./SearchBar";

const AdminPanel = () => {
  const { user } = useAuth();
  const {
    sessions,
    loading,
    createSession,
  } = useSessions(user);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Search any song...</h2>
      <SearchBar />

      <button
        onClick={createSession}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        ➕ Create Session
      </button>

      <div>
        <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li
                key={s._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
