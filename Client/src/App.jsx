import { BrowserRouter } from "react-router-dom";
import SignupRoutes from "./routes/SignupRoutes";
import { useEffect } from "react";
import io from "socket.io-client";

// יצירת חיבור לסוקט
const socket = io("http://localhost:3001");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <SignupRoutes />
    </BrowserRouter>
  );
}

export default App;
