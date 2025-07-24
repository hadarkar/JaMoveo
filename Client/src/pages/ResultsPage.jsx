// src/pages/ResultsPage.jsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSongSearch } from "../hooks/useSongSearch";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";
import { useSessionStatus } from "../hooks/useSessionStatus";
import { useAuth } from "../hooks/useAuth"; // ✅ נדרש כדי לבדוק תפקיד

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q") || "";

  const { results, loading, error, search } = useSongSearch();
  const { hasJoinedSession } = useSessionStatus(); // ✅ נדרש כדי לבדוק אם הצטרף
  const { user } = useAuth(); // ✅ נדרש כדי לבדוק אם הוא אדמין

  useEffect(() => {
    if (!q) {
      navigate("/main");
    } else {
      search(q);
    }
  }, [q, search, navigate]);

  const safeResults = Array.isArray(results) ? results : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Results for “{q}”</h1>
      <p className="mb-4 text-gray-700">
        You searched for: <strong>{q}</strong>
      </p>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && safeResults.length === 0 && (
        <div>
          <p>Could not find any songs :(</p>
          <button
            onClick={() => navigate("/main")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Main
          </button>
        </div>
      )}

      {!loading && safeResults.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Song</th>
              <th className="py-2 px-4 border-b text-left">Artist</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {safeResults.map((song) => (
              <tr key={song.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{song.title}</td>
                <td className="py-2 px-4 border-b">{song.artist}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => {
                      const isAdmin = user?.role === "admin";

                      if (!isAdmin && !hasJoinedSession) {
                        alert("❗ Please join the session before selecting a song.");
                        return;
                      }

                      socket.emit("songSelected", {
                        sessionId: song.id,
                        song,
                      });

                      navigate(`/live/${encodeURIComponent(song.id)}`);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultsPage;
