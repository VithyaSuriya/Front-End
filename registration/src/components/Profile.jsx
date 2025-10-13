import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import UsersTable from "./UsersTable";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) {
      setUser(loggedUser);
      setEditData(loggedUser);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === user.email ? editData : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(editData));
    setUser(editData);
    setIsEditing(false);
    toast.success("Profile updated successfully!", { duration: 1000 });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
      { duration: 1000 }
    );
    if (confirmDelete) {
      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");
      toast.success("Account deleted!", { duration: 1000 });
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("Logged out successfully!", { duration: 1000 });
    navigate("/login");
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 flex flex-col items-center py-10 px-4">
      <Toaster position="top-right" richColors />

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        {!isEditing ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Welcome, {user.firstName}!
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  First Name
                </label>
                <p className="text-gray-800 text-lg">{user.firstName}</p>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Last Name
                </label>
                <p className="text-gray-800 text-lg">{user.lastName}</p>
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <p className="text-gray-800 text-lg">{user.email}</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editData.firstName}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editData.lastName}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 w-full max-w-3xl">
        <UsersTable />
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-8 w-11/12 max-w-md shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to log out?
            </p>

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
