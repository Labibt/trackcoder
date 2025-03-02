import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiCode,
} from "react-icons/fi";
import { UserContext } from "../context/contextAPI";
import { useContext } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    leetcode_id: "",
    codechef_id: "",
    gfg_id: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleGuestLogin = async () => {
    try {
      console.log("Trying to log in as guest...");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: "testuserLGC3@example.com",
          password: "SecurePassword123",
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Save tokens or other details if needed
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", response.data.user);
        setIsAuthenticated(true);
        navigate(`/user`);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Guest login failed. Please try again."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start the loading spinner

    try {
      if (isLogin) {
        console.log("Trying to log in...");
        console.log(formData);
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log("Login successful:", response.data);
          localStorage.setItem("user", response.data.user);
          localStorage.setItem("accessToken", response.data.accessToken);
          setIsAuthenticated(true);
          navigate(`/user`);
          setFormData({ email: "", password: "" });
        }
      } else {
        if (
          !formData.leetcode_id &&
          !formData.codechef_id &&
          !formData.gfg_id
        ) {
          setError("Please provide at least one platform ID");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );

        if (response.status == 201) {
          setIsLogin(true);
          setError("Registration successful! Please login.");
          setFormData({ email: "", password: "" });
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
      console.error("Error during login/registration:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Matrix-like animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-500/20 whitespace-nowrap text-sm animate-matrix"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  top: "-100%",
                }}
              >
                {Array.from({ length: 50 }).map((_, j) => (
                  <div key={j} className="my-2">
                    {Math.random().toString(2).substring(2, 10)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <FiCode className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-gray-400 mt-2">
              {isLogin
                ? "Enter your credentials to continue your journey"
                : "Join our community of developers"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Registration form */}
            {!isLogin && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="leetcode_id"
                    placeholder="LeetCode ID"
                    value={formData.leetcode_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="codechef_id"
                    placeholder="CodeChef ID"
                    value={formData.codechef_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    name="gfg_id"
                    placeholder="GFG ID"
                    value={formData.gfg_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiMail className="w-5 h-5" />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiLock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>

            {isLogin && (
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full py-2 px-4 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Continue as Guest
              </button>
            )}
          </form>

          <p className="text-center text-gray-400 mt-4">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
