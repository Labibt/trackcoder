import React from "react";
import { FiArrowDown, FiArrowUp, FiMinus } from "react-icons/fi";

export default function PlatformStats({
  platforms,
  activeTab,
  userData,
  friendData = null,
}) {
  const getComparisonDisplay = (userValue, friendValue) => {
    if (userValue === friendValue)
      return { icon: FiMinus, color: "text-gray-400" };
    if (userValue > friendValue)
      return { icon: FiArrowUp, color: "text-green-400" };
    return { icon: FiArrowDown, color: "text-red-400" };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {Object.entries(platforms).map(([key, platform]) => {
        const userStats = userData[`${key}_data`];
        const friendStats = friendData?.[`${key}_data`];
        const comparison = friendData
          ? getComparisonDisplay(
              userStats?.total_solved || 0,
              friendStats?.total_solved || 0
            )
          : null;

        return (
          <div
            key={key}
            className={`p-6 rounded-lg ${platform.bgColor} border ${platform.borderColor} backdrop-blur-sm transition-transform hover:scale-105`}
          >
            <div className="flex items-center gap-3 mb-4">
              <platform.icon className={`w-6 h-6 ${platform.color}`} />
              <h3 className={`text-lg font-semibold ${platform.color}`}>
                {platform.name}
              </h3>
            </div>
            <div className="space-y-2">
              {friendData ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Problems</span>
                    <span className="font-semibold">
                      {userStats?.total_solved || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Friend's Problems</span>
                    <div className="flex items-center gap-2">
                      <comparison.icon
                        className={`w-4 h-4 ${comparison.color}`}
                      />
                      <span className="font-semibold">
                        {friendStats?.total_solved || 0}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Problems Solved</span>
                    <span className="font-semibold">
                      {userStats?.total_solved || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-semibold">
                      {userStats?.rating || "N/A"}
                    </span>
                  </div>
                </>
              )}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <DifficultyBox
                  label="Easy"
                  count={userStats?.easy}
                  friendCount={friendStats?.easy}
                  color="green"
                />
                <DifficultyBox
                  label="Medium"
                  count={userStats?.medium}
                  friendCount={friendStats?.medium}
                  color="yellow"
                />
                <DifficultyBox
                  label="Hard"
                  count={userStats?.hard}
                  friendCount={friendStats?.hard}
                  color="red"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DifficultyBox = ({ label, count, friendCount, color }) => (
  <div className={`text-center p-2 rounded-lg bg-${color}-500/10`}>
    <div
      className={`text-${color}-400 font-bold flex items-center justify-center gap-1`}
    >
      <span>{count || 0}</span>
      {friendCount !== undefined && (
        <>
          <span className="text-gray-400">/</span>
          <span>{friendCount || 0}</span>
        </>
      )}
    </div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);
