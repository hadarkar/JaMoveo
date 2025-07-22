import { useAuth } from "../hooks/useAuth";
import { useSessions } from "../hooks/useSessions";

const SessionList = () => {
  const { user } = useAuth();
  const { sessions, loading, joinSession } = useSessions(user);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">🎵 Active Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions yet.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s._id} className="border p-3 rounded flex justify-between">
              <span className="font-medium">{s.name}</span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => joinSession(s._id)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;
