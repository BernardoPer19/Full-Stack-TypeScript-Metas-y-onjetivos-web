import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContextxt";

function NavBar() {
  const { isAuthenticate, setIsAuthenticate } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticate(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">🌟 My Goals App</div>

      <div className="space-x-4">
        {isAuthenticate ? (
          <>
            <Link
              to="/goals"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
            >
              Goals
            </Link>
            <Link
              to="/form-goals"
              className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 font-medium transition"
            >
              Create Goal
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-medium transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 font-medium transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
