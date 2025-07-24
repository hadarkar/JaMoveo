// src/pages/MainPage.jsx

import { useEffect } from "react";
import { useAuth }   from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { socket }      from "../hooks/sessionHooks/sessionSocketInstance";
import AdminPanel      from "../components/AdminPanel";
import SessionList     from "../components/SessionList";

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      socket.on("songStarted", ({ sessionId }) => {
        navigate(`/live/${sessionId}`);
      });
      return () => socket.off("songStarted");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="p-8">
      {user.role === "admin" ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            🎩 Welcome, Admin {user.username}
          </h1>
          <p className="text-lg mb-4">
            Manage sessions and control the jam flow.
          </p>
          <AdminPanel />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            🎧 Welcome, {user.username}
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            ⏳ Waiting for next song...
          </p>
          <SessionList />
        </div>
      )}
    </div>
  );
};

export default MainPage;
