import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import LivePage from "../pages/LivePage"; // ✅ חדש
import PrivateRoute from "../components/PrivateRoute"; // ודא שהנתיב נכון

const SignupRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup-admin" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* 🛡️ route מוגנים – רק למשתמשים מחוברים */}
    <Route
      path="/main"
      element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/live"
      element={
        <PrivateRoute>
          <LivePage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default SignupRoutes;
