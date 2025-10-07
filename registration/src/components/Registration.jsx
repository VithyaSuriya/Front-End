import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../validations/registrationSchema";
import { Toaster, toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isDuplicate = existingUsers.some((user) => user.email === data.email);
    if (isDuplicate) {
      toast.error("This email is already registered!");
      return;
    }
    existingUsers.push(data);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    toast.success("Account created successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-100">
      <Toaster position="top-right" richColors />
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500">Sign up to get started</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div>
              <label className="block text-gray-600 mb-3">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="First Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
              />
              {errors.firstName && (
                <p className="text-red-500  text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

 
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>


          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
