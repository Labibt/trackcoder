import React from "react";

const PlatformInputs = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="leetcode_id"
          placeholder="LeetCode ID"
          value={formData.leetcode_id}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="codechef_id"
          placeholder="CodeChef ID"
          value={formData.codechef_id}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="gfg_id"
          placeholder="GFG ID"
          value={formData.gfg_id}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default PlatformInputs;
