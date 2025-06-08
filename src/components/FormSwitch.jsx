import React from "react";

const FormSwitch = ({ label, icon: Icon, checked, onChange }) => (
  <label className="flex items-center cursor-pointer mb-4">
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`block w-14 h-8 rounded-full ${
          checked ? "bg-blue-500" : "bg-gray-600"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
          checked ? "transform translate-x-6" : ""
        }`}
      ></div>
    </div>
    <div className="ml-3 text-gray-300 font-medium flex items-center">
      {Icon && <Icon className="mr-2 text-blue-400" />}
      {label}
    </div>
  </label>
);

export default FormSwitch;
