import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-green-100 to-green-300 shadow-md py-4 px-8 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-2xl font-bold text-green-800">MyApp</h1>

      <div className="flex gap-6 items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
