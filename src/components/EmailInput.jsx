import React from "react";
import { FiMail } from "react-icons/fi";

const EmailInput = ({ value, onChange, placeholder = "Email address" }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <FiMail className="w-5 h-5" />
      </div>
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
        required
      />
    </div>
  );
};

export default EmailInput;
