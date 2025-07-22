import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ ייבוא navigate
import { useAuth } from "../context/useAuth";

function Signup() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const navigate = useNavigate(); // ✅ קריאה ל־navigate
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signup({ ...formData, role: isAdmin ? "admin" : "user" });
      setMessage("✅ Signup successful!");
      navigate("/login"); // ✅ נווט אוטומטית לאחר רישום
    } catch (err) {
      console.error("❌ Signup error:", err.message);
      setMessage(err.message || "Signup failed");
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
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
