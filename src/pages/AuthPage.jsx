import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiCode } from "react-icons/fi";
import { UserContext } from "../context/contextAPI";
import MatrixBackground from "../components/MatrixBackground";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import PlatformInputs from "../components/PlatformInputs";
import { login, register, guestLogin } from "../services/authService";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
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

  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
  }, [searchParams]);

  const handleToggleMode = () => {
    const newMode = !isLogin;
    setIsLogin(newMode);
    navigate(`/auth?mode=${newMode ? "login" : "signup"}`, { replace: true });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await guestLogin();
      setIsAuthenticated(true);
      navigate(`/user`);
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
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        setIsAuthenticated(true);
        navigate(`/user`);
        setFormData({ email: "", password: "" });
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

        await register(formData);
        setIsLogin(true);
        setError("Registration successful! Please login.");
        setFormData({ email: "", password: "" });
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
      <MatrixBackground />

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
            {!isLogin && (
              <PlatformInputs
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            <EmailInput
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
            />

            <PasswordInput
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
            />

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
              onClick={handleToggleMode}
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
