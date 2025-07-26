import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Guitar, Piano } from "lucide-react";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminSignup = location.pathname === "/signup-admin";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instrument: "",
    role: isAdminSignup ? "admin" : "user",
  });

  const [message, setMessage] = useState("");

  // Update role when path changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: isAdminSignup ? "admin" : "user",
    }));
  }, [isAdminSignup]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.username || !formData.password || !formData.instrument) {
      setMessage("יש למלא את כל השדות (שם משתמש, סיסמה וכלי נגינה)");
      return;
    }

    try {
      // חיזוק - ודא ש-role מוגדר שוב לפי הנתיב הנוכחי
      const signupData = {
        ...formData,
        role: isAdminSignup ? "admin" : "user",
      };

      await signup(signupData);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("שם המשתמש כבר קיים במערכת");
      } else {
        setMessage("שגיאה בהרשמה");
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
          <h2 className="text-3xl font-bold text-white">הרשמה</h2>
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
          <select
            name="instrument"
            onChange={handleChange}
            className="w-full p-3 bg-black/30 border border-purple-200 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">בחר כלי נגינה</option>
            <option value="guitar">גיטרה</option>
            <option value="piano">פסנתר</option>
            <option value="drums">תופים</option>
            <option value="bass">בס</option>
            <option value="vocal">שירה</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow transition"
          >
            הרשם
          </button>
        </form>

        {/* קישורים להרשמה אחרת והתחברות */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm text-white">
            {isAdminSignup ? (
              <>
                רוצים להירשם כמשתמש רגיל?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-purple-300 underline hover:text-purple-100 transition"
                >
                  מעבר להרשמה רגילה
                </button>
              </>
            ) : (
              <>
                נרשמים כאדמין?{" "}
                <button
                  onClick={() => navigate("/signup-admin")}
                  className="text-purple-300 underline hover:text-purple-100 transition"
                >
                  מעבר להרשמת אדמין
                </button>
              </>
            )}
          </p>

          <p className="text-sm text-white">
            כבר רשומים?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-300 underline hover:text-purple-100 transition"
            >
              התחברות
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
