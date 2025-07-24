import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";
import { useAuth } from "../hooks/useAuth";

const LivePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userInstrument = user?.instrument;
  const userRole = user?.role;

  const [song, setSong] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // פונקציה לזיהוי שיר בעברית
  const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

  // סקרול אוטומטי
  useEffect(() => {
    if (autoScroll) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({
            top: 1,
            behavior: "smooth",
          });
        }
      }, 60);
    } else {
      clearInterval(scrollIntervalRef.current);
    }

    return () => clearInterval(scrollIntervalRef.current);
  }, [autoScroll]);

  // חיבור לסשן
  useEffect(() => {
    socket.emit("joinSession", "singleton");

    socket.on("songStarted", ({ song }) => {
      setSong(song);
    });

    socket.on("sessionEnded", () => {
      alert("⚠️ The session has ended.");
      navigate("/main");
    });

    return () => {
      socket.off("songStarted");
      socket.off("sessionEnded");
    };
  }, [navigate]);

  const handleQuitSession = () => {
    if (window.confirm("Are you sure you want to quit the session?")) {
      socket.emit("quitSession");
    }
  };

  const toggleScroll = () => {
    setAutoScroll((prev) => !prev);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-extrabold">Live Session 🎸</h1>
        <div className="flex gap-4">
          {userRole === "admin" && (
            <button
              onClick={handleQuitSession}
              className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
            >
              Quit Session
            </button>
          )}
          <button
            onClick={toggleScroll}
            className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
          >
            {autoScroll ? "Stop Scroll 🛑" : "Start Scroll 🌀"}
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="max-h-[75vh] overflow-y-auto space-y-10 mt-10 pr-3"
      >
        {song?.lyrics?.map((line, i) => (
          <div
            key={i}
            className="flex flex-wrap gap-x-6 min-h-[120px]"
            dir={isHebrew(line[0]?.lyrics) ? "rtl" : "ltr"}
          >
            {line.map((wordObj, j) => (
              <div
                key={j}
                className="flex flex-col items-center min-w-[70px]"
              >
                {userInstrument !== "singer" && (
                  <span className="text-xl text-blue-700 font-bold">
                    {wordObj.chords || "\u00A0"}
                  </span>
                )}
                <span className="text-4xl font-semibold">
                  {wordObj.lyrics}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePage;
