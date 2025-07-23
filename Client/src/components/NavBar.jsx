import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // נקה את המשתמש מהקונטקסט ומה-localStorage
    navigate("/login");  // נווט חזרה לדף התחברות
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:underline">Admin Panel</Link>
            <Link to="/sessions" className="hover:underline">Manage Sessions</Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/main" className="hover:underline">My Music</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
