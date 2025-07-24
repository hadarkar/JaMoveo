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

  const isHebrewSong = (lyricsArray) => {
    const text = lyricsArray.flat().map((w) => w.lyrics).join(" ");
    return /[\u0590-\u05FF]/.test(text);
  };

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

  useEffect(() => {
    const savedSong = localStorage.getItem("activeSong");
    if (savedSong) {
      setSong(JSON.parse(savedSong));
    }
  }, []);

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
      navigate("/main");
    }
  };

  const toggleScroll = () => {
    setAutoScroll((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300 p-4 sm:p-6 flex justify-center items-start overflow-hidden">
      {/* 🎶 קישוטים רקעיים */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-10 text-white text-4xl rotate-12 opacity-30">🎶</div>
        <div className="absolute bottom-16 left-6 text-white text-5xl -rotate-12 opacity-25">🎼</div>
        <div className="absolute top-1/2 left-1/3 text-white text-2xl rotate-[25deg] opacity-20">🎵</div>
      </div>

      {/* תוכן */}
      <div className="w-full max-w-5xl relative z-10">
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

        {song?.title && (
          <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
            🎵 {song.title} – {song.artist}
          </h2>
        )}

        {song?.lyrics && (
  <div className="relative">
    {/* תופים ימניים */}  
<div className="absolute top-[10%] right-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(-45deg)" }}>🥁</div>
<div className="absolute top-[25%] right-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(45deg)" }}>🥁</div>
<div className="absolute top-[50%] right-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(-45deg)" }}>🥁</div>
<div className="absolute top-[65%] right-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(45deg)" }}>🥁</div>

{/* תופים שמאליים */}  
<div className="absolute top-[10%] left-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(-45deg)" }}>🥁</div>
<div className="absolute top-[25%] left-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(45deg)" }}>🥁</div>
<div className="absolute top-[50%] left-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(-45deg)" }}>🥁</div>
<div className="absolute top-[65%] left-[-50px] text-white text-2xl opacity-20" style={{ transform: "rotate(45deg)" }}>🥁</div>


    {/* תיבת הליריקה עצמה */}
    <div
      ref={scrollContainerRef}
      dir={isHebrewSong(song.lyrics) ? "rtl" : "ltr"}
      className="max-h-[75vh] overflow-y-auto space-y-10 mt-10 pr-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-inner"
    >
      {song.lyrics.map((line, i) => (
        <div key={i} className="flex flex-wrap justify-center gap-x-6 min-h-[120px]">
          {line.map((wordObj, j) => (
            <div key={j} className="flex flex-col items-center min-w-[70px]">
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
  </div>
)}
      </div>
    </div>
  );
};

export default LivePage;
