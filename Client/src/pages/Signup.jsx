import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Signup() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/api/auth/signup", {
        ...formData,
        role: isAdmin ? "admin" : "user"
      });

      console.log("✅ Signed up:", res.data); // 👈 בדיקה חשובה
      setMessage("Signup successful!");

        // Save token to localStorage for future requests - dont forget to put in COntext folder later on
      localStorage.setItem("token", res.data.token);
      
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isAdmin ? "Admin Signup" : "User Signup"}
      </h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="instrument"
          placeholder="Instrument"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-center">
        <button type="submit" cclassName="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded center">
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
