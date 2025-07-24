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

  // פונקציה לזיהוי אם השיר בעברית
  const isHebrewSong = (lyricsArray) => {
    const text = lyricsArray.flat().map((w) => w.lyrics).join(" ");
    return /[\u0590-\u05FF]/.test(text);
  };

  // גלילה אוטומטית
  useEffect(() => {
    if (autoScroll && scrollContainerRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        scrollContainerRef.current.scrollBy({
          top: 1,
          behavior: "smooth",
        });
      }, 60);
    } else {
      clearInterval(scrollIntervalRef.current);
    }

    return () => clearInterval(scrollIntervalRef.current);
  }, [autoScroll]);

  // טעינה מה־localStorage
  useEffect(() => {
    const savedSong = localStorage.getItem("activeSong");
    if (savedSong) {
      setSong(JSON.parse(savedSong));
    }
  }, []);

  // התחברות לסשן
  useEffect(() => {
    socket.emit("joinSession", "singleton");

    socket.on("songStarted", ({ song }) => {
      setSong(song);
      localStorage.setItem("activeSong", JSON.stringify(song));
    });

    socket.on("sessionEnded", () => {
      alert("⚠️ The session has ended.");
      localStorage.removeItem("activeSong");
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
    localStorage.removeItem("activeSong");
    navigate("/main"); // 👈 ניווט מיידי
  }
};


  const toggleScroll = () => {
    setAutoScroll((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0e7ff] p-4 sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl">
        {/* כותרת עליונה */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-4xl font-extrabold text-center sm:text-left">Live Session 🎸</h1>

          <div className="flex gap-4 justify-center sm:justify-end">
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
              className={`${
                autoScroll ? "bg-purple-700" : "bg-purple-600"
              } text-white px-5 py-2 rounded-xl hover:bg-purple-800`}
            >
              {autoScroll ? "Stop Scroll 🛑" : "Start Scroll 🌀"}
            </button>
          </div>
        </div>

        {/* שם שיר */}
        {song?.title && (
          <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
            🎵 {song.title} – {song.artist}
          </h2>
        )}

        {/* ליריקה */}
        {song?.lyrics && (
          <div
            ref={scrollContainerRef}
            dir={isHebrewSong(song.lyrics) ? "rtl" : "ltr"}
            className="max-h-[75vh] overflow-y-auto space-y-10 mt-10 pr-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-inner"
          >
            {song.lyrics.map((line, i) => (
              <div
                key={i}
                className="flex flex-wrap justify-center gap-x-6 min-h-[120px]"
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
                    <span className="text-4xl font-semibold text-gray-900 text-right w-full">
                      {wordObj.lyrics}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePage;
