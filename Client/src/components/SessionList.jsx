import { useEffect, useState } from "react";
import axios from "axios";


const SessionList = () => {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
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
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) return <p className="text-gray-500">Loading sessions...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">🎵 Active Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions yet.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s._id} className="border p-3 rounded">
              <span className="font-medium">{s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;
