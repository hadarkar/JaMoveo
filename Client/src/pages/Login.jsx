import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Guitar, Piano } from "lucide-react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!formData.username || !formData.password) {
    setMessage("יש להזין שם משתמש וסיסמה");
    return;
  }

  try {
    await login(formData);
    navigate("/main");
  } catch (err) {
    const serverMsg = err.response?.data?.message || "";
    if (serverMsg.includes("not found") || serverMsg.includes("invalid")) {
      setMessage("התחברות נכשלה /שם המשתמש או הסיסמה שגויים");
    } else {
      setMessage("שגיאה בהתחברות");
    }
  }
};


  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-30 animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900 overflow-hidden">
      <div className="absolute inset-0 z-0">{generateStars()}</div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 border border-indigo-100">
        <div className="flex justify-center items-center gap-4 text-purple-300">
          <Guitar className="w-8 h-8" />
          <h2 className="text-3xl font-bold text-white">התחברות</h2>
          <Piano className="w-8 h-8" />
        </div>

        {message && <p className="text-center text-red-400">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="שם משתמש"
            onChange={handleChange}
            className="w-full p-3 bg-black/30 border border-purple-200 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            onChange={handleChange}
            className="w-full p-3 bg-black/30 border border-purple-200 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow transition"
          >
            התחבר
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
