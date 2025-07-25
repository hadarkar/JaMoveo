import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const API = import.meta.env.VITE_API_URL;



export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // בטעינת האפליקציה – טען מה־localStorage וסט את axios.header
  useEffect(() => {
    const savedUser  = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    setIsLoading(false);
  }, []);

  // טיפול ב‑signup – שולח לשרת, מקבל back token + user._id
  const signup = async (formData) => {
    const res = await axios.post(
      `${API}/api/auth/signup`,
      formData
    );
    const { token: newToken, user: userData } = res.data;

    setUser(userData);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  // טיפול ב‑login – זהה ל‑signup
  const login = async (formData) => {
    const res = await axios.post(
      `${API}/api/auth/login`,
      formData
    );
    const { token: newToken, user: userData } = res.data;

    setUser(userData);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
