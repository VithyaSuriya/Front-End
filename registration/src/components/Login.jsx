import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      toast.success("Login successful!");
      navigate("/profile");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div className="flex flex-col text-left">
          <label className="text-gray-600 mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col text-left relative">
          <label className="text-gray-600 mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
