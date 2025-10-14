import { useState, useEffect } from "react";
import useThrottle from "../hooks/useThrottle";

export default function UsersTableApi() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const throttledSearchTerm = useThrottle(searchTerm, 500);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found.Please login first.");
          setLoading(false);
          return;
        }
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/allusers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 401) {
          console.error("Unauthorized.Token may be invalid or expired.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUsers(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(throttledSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(throttledSearchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 w-full max-w-3xl mx=auto">
      <h2 className="text-2xl font-bold mb-4 text-center">API Users</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 font-medium">Show</label>
          <div className="relative">
            <select
              value={usersPerPage}
              onChange={(e) => {
                setUsersPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="pl-3 pr-8 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none shadow-sm bg-white appearance-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>

          <span className="text-gray-600 font font-medium">entries</span>
        </div>

        <div className="relative w-1/3">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"></span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none shadow-sm "
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading Users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-2 text-right">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-bluw-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
