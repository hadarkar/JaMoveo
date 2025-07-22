import { useSessions } from "../hooks/useSessions";
import { useAuth } from "../hooks/useAuth";

const AdminPanel = () => {
  const { user } = useAuth();
  const { sessions, loading, createSession } = useSessions(user);

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
          <ul className="list-disc list-inside">
            {sessions.map((s) => (
              <li key={s._id}>{s.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
