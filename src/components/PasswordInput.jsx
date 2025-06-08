import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ value, onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <FiLock className="w-5 h-5" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
  );
};

export default PasswordInput;
