import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Input({
  label,
  icon: Icon,
  type = "text",
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
          {Icon && <Icon className="mr-2 text-blue-400" />}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
}
