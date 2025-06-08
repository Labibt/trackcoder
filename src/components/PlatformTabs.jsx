import React from "react";

const PlatformTabs = ({ platforms, activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-4 border-b border-gray-800">
        {platforms.map(([key, platform]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === key
                ? platform.color
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <platform.icon className="w-5 h-5" />
              {platform.name}
            </div>
            {activeTab === key && (
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 ${platform.bgColor}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformTabs;
