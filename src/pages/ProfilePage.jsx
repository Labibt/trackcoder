import React, { useState, useEffect, useContext } from "react";
import {
  FiCode,
  FiCoffee,
  FiBook,
  FiHexagon,
  FiSearch,
  FiGitBranch,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextAPI";
import { fetchUserProfile } from "../services/fetchUserProfile";

// Platform configuration with reordered platforms (GFG, LeetCode, CodeChef)
const PlatformData = (userData) => {
  const defaultPlatformData = {
    question_solved: [],
    total_solved: 0,
    rating: 0,
    badge: "No Badge",
    user_id: "N/A",
    easy: 0,
    medium: 0,
    hard: 0,
  };

  const platforms = {
    gfg: {
      name: "GeeksforGeeks",
      icon: FiBook,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      data: userData.gfg_data || { ...defaultPlatformData },
      userId: userData.gfg_id || "N/A",
      order: 1,
    },
    leetcode: {
      name: "LeetCode",
      icon: FiCode,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
      data: userData.leetcode_data || { ...defaultPlatformData },
      userId: userData.leetcode_data?.user_id || "N/A",
      order: 2,
    },
    codechef: {
      name: "CodeChef",
      icon: FiCoffee,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
      data: userData.codechef_data || { ...defaultPlatformData },
      userId: userData.codechef_data?.user_id || "N/A",
      order: 3,
    },
  };

  return platforms;
};

// Fetch user profile function

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("gfg");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  // const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setUserData(data);
        setPlatforms(PlatformData(data));
      } catch (err) {
        setError(err.message);
        // If error is authentication related, redirect to login
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    // Remove the userData check to always fetch fresh data
    fetchData();
  }, [setUserData, navigate]); // Remove the userData dependency

  // Sort platforms by order
  const sortedPlatforms = Object.entries(platforms).sort(
    (a, b) => a[1].order - b[1].order
  );

  const handleNavigation = () => {
    navigate("leaderboard"); // Update route path as needed
  };

  // Filter problems based on search and difficulty
  const filteredProblems =
    userData?.[`${activeTab}_data`]?.question_solved?.length > 0
      ? userData[`${activeTab}_data`].question_solved.filter((problem) => {
          const matchesSearch = problem.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesDifficulty =
            difficultyFilter === "all" ||
            (problem.difficulty &&
              problem.difficulty.toLowerCase() ===
                difficultyFilter.toLowerCase());
          return matchesSearch && matchesDifficulty;
        })
      : [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 mt-10">
      {/* Matrix-like animated background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-500/20 whitespace-nowrap text-sm animate-matrix"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.1}s`,
                  top: "-100%",
                }}
              >
                {Array.from({ length: 50 }).map((_, j) => (
                  <div key={j} className="my-2">
                    {Math.random().toString(2).substring(2, 10)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
              <FiHexagon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {userData.name}
              </h1>
              <p className="text-gray-400">@{userData.user_id}</p>
            </div>
          </div>

          {/* Total Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm hover:scale-105 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="text-2xl font-bold text-blue-400">
                {Object.values(platforms).reduce(
                  (total, platform) =>
                    total + (platform.data?.total_solved || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-400">Total Problems</div>
            </div>

            <div
              className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm hover:scale-105 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              onClick={handleNavigation}
            >
              <div className="text-2xl font-bold text-purple-400">
                {userData.friends.length}
              </div>
              <div className="text-sm text-gray-400">Friends</div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 transition-all">
              <div className="text-2xl font-bold text-green-400">
                {Math.max(
                  ...Object.values(platforms).map((p) => p.data?.rating || 0)
                )}
              </div>
              <div className="text-sm text-gray-400">Best Rating</div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm hover:scale-105 hover:bg-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
              <div className="text-2xl font-bold text-yellow-400">
                {platforms.leetcode.data?.badge || "No Badge"}
              </div>
              <div className="text-sm text-gray-400">Current Badge</div>
            </div>
          </div>
        </div>

        {/* Platform Stats - Using sortedPlatforms for ordered display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {sortedPlatforms.map(([key, platform]) => (
            <div
              key={key}
              className={`p-6 rounded-lg ${platform.bgColor} border ${platform.borderColor} backdrop-blur-sm transition-transform hover:scale-105 `}
            >
              <div className="flex items-center gap-3 mb-4">
                <platform.icon className={`w-6 h-6 ${platform.color}`} />
                <h3 className={`text-lg font-semibold ${platform.color}`}>
                  {platform.name}
                </h3>
              </div>
              {platform.data ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Problems Solved</span>
                    <span className="font-semibold">
                      {platform.data.total_solved || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-semibold">
                      {platform.data.rating || "N/A"}
                    </span>
                  </div>
                  {platform.data.easy !== undefined && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center p-2 rounded-lg bg-green-500/10">
                        <div className="text-green-400 font-bold">
                          {platform.data.easy}
                        </div>
                        <div className="text-xs text-gray-400">Easy</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-yellow-500/10">
                        <div className="text-yellow-400 font-bold">
                          {platform.data.medium}
                        </div>
                        <div className="text-xs text-gray-400">Medium</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-red-500/10">
                        <div className="text-red-400 font-bold">
                          {platform.data.hard}
                        </div>
                        <div className="text-xs text-gray-400">Hard</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  No data available
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Platform Tabs - Using sortedPlatforms for ordered display */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-800">
            {sortedPlatforms.map(([key, platform]) => (
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

        {/* Problem List */}
        <div className="space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setDifficultyFilter("all")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                difficultyFilter === "all"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDifficultyFilter("Easy")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                difficultyFilter === "Easy"
                  ? "bg-green-500/20 text-green-400 border border-green-500/20"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficultyFilter("Medium")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                difficultyFilter === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficultyFilter("Hard")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                difficultyFilter === "Hard"
                  ? "bg-red-500/20 text-red-400 border border-red-500/20"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
              }`}
            >
              Hard
            </button>
          </div>

          {filteredProblems?.length > 0 ? (
            <div className="space-y-4">
              {filteredProblems.map((problem) => (
                <div
                  key={problem._id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${platforms[activeTab].bgColor} group-hover:scale-110 transition-transform`}
                      >
                        <FiGitBranch
                          className={`w-4 h-4 ${platforms[activeTab].color}`}
                        />
                      </div>
                      <div>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-blue-400 transition-colors"
                        >
                          {problem.title}
                        </a>
                        {problem.difficulty && (
                          <span
                            className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                              problem.difficulty === "Easy"
                                ? "bg-green-500/10 text-green-400"
                                : problem.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No problems found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
