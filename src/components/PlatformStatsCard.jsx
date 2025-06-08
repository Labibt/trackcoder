import React from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiExternalLink,
} from "react-icons/fi";
import { gfgUri, leetcodeUri, codechefUri } from "../data/constantLink";

const PlatformStatsCard = ({
  platform,
  userData,
  friendData,
  showComparison = false,
}) => {
  const getComparisonDisplay = (userValue, friendValue) => {
    if (userValue === friendValue)
      return { icon: FiMinus, color: "text-gray-400" };
    if (userValue > friendValue)
      return { icon: FiArrowUp, color: "text-green-400" };
    return { icon: FiArrowDown, color: "text-red-400" };
  };

  const getPlatformUri = (platformName, userId) => {
    switch (platformName.toLowerCase()) {
      case "geeksforgeeks":
        return `${gfgUri}${userId}`;
      case "leetcode":
        return `${leetcodeUri}${userId}`;
      case "codechef":
        return `${codechefUri}${userId}`;
      default:
        return "#";
    }
  };

  const comparison = showComparison
    ? getComparisonDisplay(
        userData?.total_solved || 0,
        friendData?.total_solved || 0
      )
    : null;
  const ComparisonIcon = comparison?.icon;

  const userPlatformUri = getPlatformUri(platform.name, userData?.user_id);
  const friendPlatformUri = showComparison
    ? getPlatformUri(platform.name, friendData?.user_id)
    : null;

  return (
    <div
      className={`p-6 rounded-lg ${platform.bgColor} border ${platform.borderColor} backdrop-blur-sm transition-transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <platform.icon className={`w-6 h-6 ${platform.color}`} />
          <h3 className={`text-lg font-semibold ${platform.color}`}>
            {platform.name}
          </h3>
        </div>
        <div className="flex gap-2">
          {showComparison ? (
            friendPlatformUri && (
              <a
                href={friendPlatformUri}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg ${platform.bgColor} hover:scale-110 transition-transform`}
                title="Visit friend's profile"
              >
                <FiExternalLink className={`w-4 h-4 ${platform.color}`} />
              </a>
            )
          ) : (
            <a
              href={userPlatformUri}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg ${platform.bgColor} hover:scale-110 transition-transform`}
              title="Visit your profile"
            >
              <FiExternalLink className={`w-4 h-4 ${platform.color}`} />
            </a>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {showComparison ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Your Problems</span>
              <span className="font-semibold">
                {userData?.total_solved || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Friend's Problems</span>
              <div className="flex items-center gap-2">
                <ComparisonIcon className={`w-4 h-4 ${comparison.color}`} />
                <span className="font-semibold">
                  {friendData?.total_solved || 0}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-400">Problems Solved</span>
            <span className="font-semibold">{userData?.total_solved || 0}</span>
          </div>
        )}
        {(userData?.easy !== undefined || friendData?.easy !== undefined) && (
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-green-500/10">
              <div className="text-green-400 font-bold flex items-center justify-center gap-1">
                <span>{userData?.easy || 0}</span>
                {showComparison && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span>{friendData?.easy || 0}</span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">Easy</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-yellow-500/10">
              <div className="text-yellow-400 font-bold flex items-center justify-center gap-1">
                <span>{userData?.medium || 0}</span>
                {showComparison && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span>{friendData?.medium || 0}</span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">Medium</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-red-500/10">
              <div className="text-red-400 font-bold flex items-center justify-center gap-1">
                <span>{userData?.hard || 0}</span>
                {showComparison && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span>{friendData?.hard || 0}</span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">Hard</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformStatsCard;
