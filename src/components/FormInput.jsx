import React from "react";

const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center">
      {Icon && <Icon className="mr-2 text-teal-400" />}
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
    />
  </div>
);

export default FormInput;
