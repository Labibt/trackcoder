import React from "react";

// Feature Card Component
export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 p-6 rounded-md transform group-hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

// Upcoming Feature Card Component
export function UpcomingFeatureCard({ icon: Icon, title, description, eta }) {
  return (
    <div className="group bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 p-6 rounded-md transform group-hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-purple-600/10 text-purple-400 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="inline-block bg-purple-500/10 text-purple-400 border-purple-400/20 px-3 py-1 text-sm rounded-md mt-1">
            {eta}
          </span>
        </div>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
