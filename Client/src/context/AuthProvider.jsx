import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ חדש

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setIsLoading(false); // ✅ סיימנו לטעון מה־localStorage
  }, []);

    const signup = async (formData) => {
    await axios.post("http://localhost:3001/api/auth/signup", formData);
    // setUser(res.data.user);
    // setToken(res.data.token);
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    // localStorage.setItem("token", res.data.token);
  };

  const login = async (formData) => {
    const res = await axios.post("http://localhost:3001/api/auth/login", formData);
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {!isLoading && children} {/* ✅ לא נטען כלום עד שהמשתמש נבדק */}
    </AuthContext.Provider>
  );
};
