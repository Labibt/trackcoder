import React from "react";

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
    secondary:
      "bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-700",
    danger:
      "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
