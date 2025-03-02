import React from "react";

export default function Card({ children, title, icon: Icon, className = "" }) {
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {(title || Icon) && (
        <div className="px-6 py-4 flex items-center justify-between">
          {title && (
            <h2 className="text-2xl font-bold text-blue-400">{title}</h2>
          )}
          {Icon && (
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Icon className="text-blue-400 w-6 h-6" />
            </div>
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}
