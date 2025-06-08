import React from "react";

const FormButton = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full px-5 py-3 bg-teal-500 text-white rounded-lg font-semibold shadow-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    {children}
  </button>
);

export default FormButton;
