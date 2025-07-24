// src/pages/MainPage.jsx
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";
import AdminPanel from "../components/AdminPanel";
import SessionList from "../components/SessionList";

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      socket.on("songStarted", ({ sessionId }) => {
        navigate(`/live/${sessionId}`);
      });

      socket.on("sessionEnded", () => {
        localStorage.removeItem("activeSong");
      });

      return () => {
        socket.off("songStarted");
        socket.off("sessionEnded");
      };
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 text-gray-800 px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
      {/* 🎵 עיטורי רקע כלליים */}
      <div className="absolute top-12 right-10 text-white text-4xl opacity-30">🎶</div>
      <div className="absolute bottom-14 left-10 text-white text-3xl rotate-12 opacity-25">🎵</div>
      <div className="absolute bottom-20 right-16 text-white text-5xl -rotate-6 opacity-20">🎼</div>
      <div className="absolute top-[40%] left-[48%] text-white text-2xl rotate-[20deg] opacity-20 hidden sm:block">🎶</div>

      {/* תוכן דינמי */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {user.role === "admin" ? (
          <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-900">
              🎩 Welcome, Admin {user.username}
            </h1>
            <p className="text-lg text-gray-700">Manage sessions and control the jam flow.</p>
            <AdminPanel />
          </div>
        ) : (
<div className="bg-gradient-to-br from-yellow-100 via-sky-200 to-teal-200 text-gray-800 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl text-center space-y-6 border-2 border-teal-300 relative overflow-hidden">
            {/* עיטורים ייחודיים למשתמש */}
            <div className="absolute top-4 left-4 text-yellow-300 text-2xl rotate-12 opacity-40">🎺</div>
            <div className="absolute bottom-4 right-4 text-yellow-400 text-3xl -rotate-12 opacity-30">🥁</div>
            <div className="absolute top-1/2 right-10 text-yellow-300 text-2xl rotate-6 opacity-20 hidden sm:block">🎷</div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-800 drop-shadow-md">
              🎧 Welcome, {user.username}
            </h1>
            <p className="text-xl text-yellow-700">⏳ Waiting for next song...</p>

            <SessionList />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
