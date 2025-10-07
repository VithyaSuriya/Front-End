import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
        <p className="text-gray-500 text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col">
      <Toaster position="top-right" richColors />

      <nav
        className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
        aria-label="Primary Navigation"
      >
        <h1 className="text-xl font-bold text-green-600">My App</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            aria-haspopup="dialog"
            aria-expanded={showLogoutConfirm}
            aria-controls="logout-confirmation"
          >
            Logout
          </button>

          <button
            onClick={() => alert("Edit Profile functionality coming soon!")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center mt-10 flex-1 px-4 sm:px-0">
        <div className="card bg-white p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome, {user.firstName}!
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">First Name</label>
              <p className="text-gray-800 text-lg">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Last Name</label>
              <p className="text-gray-800 text-lg">{user.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <p className="text-gray-800 text-lg">{user.email}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          id="logout-confirmation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logoutDialogTitle"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div className="bg-white rounded-xl p-8 w-11/12 max-w-md shadow-lg">
            <h3 id="logoutDialogTitle" className="text-2xl font-semibold mb-4">
              Confirm Logout
            </h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
