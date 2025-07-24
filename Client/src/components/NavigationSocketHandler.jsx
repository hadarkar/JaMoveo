import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";

const NavigationSocketHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("navigateToLive", (song) => {
      console.log("📡 Received navigateToLive event:", song);
      navigate("/live/singleton"); // אם בעתיד תרצה לעבוד עם מזהי סשנים שונים – שנה את זה
    });

    return () => {
      socket.off("navigateToLive");
    };
  }, [navigate]);

  return null;
};

export default NavigationSocketHandler;
