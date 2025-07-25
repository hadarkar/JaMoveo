import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoutesManager from "../routes/RoutesManager";
import NavBar from "../components/NavBar";
import { socket } from "../hooks/sessionHooks/sessionSocketInstance";



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

  const hideNavOnRoutes = ["/", "/login", "/signup", "/signup-admin"];
  const shouldHideNav = hideNavOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <NavBar />}
      <RoutesManager />
    </>
  );
};

export default AppContent;