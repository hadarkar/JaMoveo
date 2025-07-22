import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

const MainPage = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  // האזנה ל־socket - רק לשחקנים
  useEffect(() => {
    if (user?.role === "user") {
      socket.on("songStarted", (songData) => {
        console.log("🎵 Song started:", songData);
        navigate("/live"); // ניווט אוטומטי למסך השיר
      });

      return () => socket.off("songStarted");
    }
  }, [user, navigate]);

  // שליפת כל הסשנים בטעינה ראשונית (לאדמין בלבד)
  useEffect(() => {
    const fetchSessions = async () => {
      if (user?.role !== "admin") return;
      try {
        const res = await axios.get("http://localhost:3001/api/sessions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSessions(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch sessions:", err);
      }
    };

    fetchSessions();
  }, [user]);

  const handleCreateSession = async () => {
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

      // הוספה לרשימה המקומית
      setSessions((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("❌ Failed to create session:", err);
      alert("Failed to create session.");
    }
  };

  if (!user) return null;

  return (
    <div className="p-8">
      {/* 🛠 Admin View */}
      {user.role === "admin" && (
        <div>
          <h1 className="text-3xl font-bold mb-4">🎩 Welcome, Admin {user.name}</h1>
          <p className="text-lg mb-4">Manage sessions and control the jam flow.</p>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCreateSession}
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
      )}

      {/* 🎧 Player View */}
      {user.role === "user" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🎧 Welcome, {user.name}</h1>
          <p className="text-xl text-gray-700">⏳ Waiting for next song...</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
