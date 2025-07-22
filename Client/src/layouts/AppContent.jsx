import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignupRoutes from "../routes/SignupRoutes";
import NavBar from "../components/NavBar";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const AppContent = () => {
  const location = useLocation();

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

  const hideNavOnRoutes = ["/", "/login", "/signup"];
  const shouldHideNav = hideNavOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <NavBar />}
      <SignupRoutes />
    </>
  );
};

export default AppContent;
