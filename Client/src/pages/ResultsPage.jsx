import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSongSearch } from "../hooks/useSongSearch";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";
import { useSessionStatus } from "../hooks/sessionHooks/useSessionStatus";
import { useAuth } from "../hooks/useAuth";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q") || "";

  const { results, loading, error, search } = useSongSearch();
  const { hasJoinedSession } = useSessionStatus();
  const { user } = useAuth();

  useEffect(() => {
    if (!q) {
      navigate("/main");
    } else {
      search(q);
    }
  }, [q, search, navigate]);

  const safeResults = Array.isArray(results) ? results : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-sky-200 to-teal-200 px-4 py-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-teal-700">
          תוצאות עבור “{q}”
        </h1>

        {loading && <p className="text-center text-gray-600">טוען שירים...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && safeResults.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-lg sm:text-xl">לא נמצאו שירים תואמים 🙁</p>
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/main")}
                className="bg-white hover:bg-gray-100 text-teal-700 px-5 py-2 rounded-full shadow transition"
              >
                חזרה למסך הראשי
              </button>
            )}
          </div>
        )}

        {!loading && safeResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {safeResults.map((song) => (
              <div
                key={song.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    🎵 {song.title}
                  </h2>
                  <p className="text-sm text-gray-600">מאת: {song.artist}</p>
                </div>

                <div className="mt-auto text-left">
                  <button
                    onClick={() => {
                      const isAdmin = user?.role === "admin";

                      if (!isAdmin && !hasJoinedSession) {
                        alert("❗ הצטרף לסשן לפני בחירת שיר.");
                        return;
                      }

                      socket.emit("songSelected", {
                        sessionId: song.id,
                        song,
                      });

                      navigate(`/live/${encodeURIComponent(song.id)}`);
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow transition"
                  >
                    בחר שיר
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
