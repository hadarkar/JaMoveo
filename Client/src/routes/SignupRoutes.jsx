import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import LivePage from "../pages/LivePage";
import PrivateRoute from "../components/PrivateRoute";

const SignupRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup-admin" element={<Signup admin />} />
    <Route path="/login" element={<Login />} />

    {/* מסלולים מוגנים */}
    <Route
      path="/main"
      element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/live/:sessionId"
      element={
        <PrivateRoute>
          <LivePage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default SignupRoutes;
