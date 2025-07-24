// src/routes/RoutesManager.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Signup      from "../pages/Signup";
import Login       from "../pages/Login";
import MainPage    from "../pages/MainPage";
import ResultsPage from "../pages/ResultsPage";
import LivePage    from "../pages/LivePage";
import PrivateRoute from "../components/PrivateRoute";

const RoutesManager = () => (
  <Routes>
    {/* ציבוריים */}
    <Route path="/signup"       element={<Signup />} />
    <Route path="/signup-admin" element={<Signup admin />} />
    <Route path="/login"        element={<Login />} />

    {/* ברירת מחדל */}
    <Route path="/" element={<Navigate to="/main" replace />} />

    {/* מוגנים */}
    <Route
      path="/main"
      element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/results"
      element={
        <PrivateRoute>
          <ResultsPage />
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

    {/* כל נתיב אחר */}
    <Route path="*" element={<Navigate to="/main" replace />} />
  </Routes>
);

export default RoutesManager;
