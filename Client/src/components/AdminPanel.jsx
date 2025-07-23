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

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={createSession}
      >
        ➕ Create New Session
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
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
                {s.createdBy?._id === user._id && ( // ✅ השוואה תקינה
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => startSession(s._id)}
                  >
                    ▶ Start Session
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
