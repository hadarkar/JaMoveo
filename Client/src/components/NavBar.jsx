import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/main")}>
        🎵 JAMOVEO
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <span className="text-sm text-gray-300">
            Welcome, <span className="font-medium">{user.username}</span>
          </span>
        )}

        <button
          onClick={() => navigate("/main")}
          className="hover:text-gray-300 transition"
        >
          Home
        </button>

        <button
          onClick={handleLogout}
          className="hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
