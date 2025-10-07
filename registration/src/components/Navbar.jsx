import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/login" className="text-gray-700 hover:text-green-600 transition">
          Login
        </Link>
        <Link to="/signup" className="text-gray-700 hover:text-green-600 transition">
          Register
        </Link>
      </div>
    </nav>
  );
}
