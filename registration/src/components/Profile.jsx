import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Get user data from localStorage on component mount
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      // If no user is logged in, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // remove the logged-in user
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (!user) return null; // prevents rendering before user data

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col">
      <Toaster position="top-right" richColors />

      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">My App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Profile Content */}
      <div className="flex justify-center items-center mt-10 flex-1">
        <div className="card bg-white p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">First Name</label>
              <p className="text-gray-800">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Last Name</label>
              <p className="text-gray-800">{user.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
