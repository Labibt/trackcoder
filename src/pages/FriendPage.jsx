import React, { useEffect, useState, useContext } from "react";
import {
  FiCode,
  FiCoffee,
  FiBook,
  FiGitBranch,
  FiHexagon,
  FiSearch,
  FiUserMinus,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
} from "react-icons/fi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextAPI";
import { baseUri } from "../data/constantData";

const Userdata1 = {
  user: {
    userId: "testuserLGC3",
    name: "Test User 3",
    email: "testuserLGC3@example.com",
    gfg_data: {
      total_solved: 45,
      easy: 15,
      medium: 20,
      hard: 10,
      rating: 1800,
      badge: "No Badge",
    },
    leetcode_data: {
      total_solved: 20,
      easy: 4,
      medium: 13,
      hard: 3,
      rating: 2000,
      badge: "No Badge",
    },
    codechef_data: {
      total_solved: 75,
      rating: 1500,
      badge: "No Badge",
    },
  },
  friend: {
    _id: "6743884df5da3d4c35572d8c",
    name: "DEfult vikash",
    gfg_data: {
      total_solved: 55,
      easy: 20,
      medium: 25,
      hard: 10,
      rating: 2000,
      badge: "Gold",
      question_solved: [
        {
          _id: "673c30e077b702a0a148e5c5",
          title: "Geek Jump",
          difficulty: "Easy",
          link: "https://practice.geeksforgeeks.org/problems/geek-jump/0",
        },
        {
          _id: "673c30e077b702a0a148e5e6",
          title: "Subset Sum Problem",
          difficulty: "Medium",
          link: "https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/0",
        },
      ],
    },
    leetcode_data: {
      total_solved: 30,
      easy: 10,
      medium: 15,
      hard: 5,
      rating: 1800,
      badge: "Guardian",
      question_solved: [
        {
          _id: "673a21a8b6a134475f60b32a",
          title: "Two Sum",
          difficulty: "Easy",
          link: "https://leetcode.com/problems/two-sum/",
        },
      ],
    },
    codechef_data: {
      total_solved: 0,
      rating: 0,
      badge: "No Badge",
      question_solved: [],
    },
  },
};
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000;

const platforms = {
  gfg: {
    name: "GeeksforGeeks",
    icon: FiBook,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    order: 1,
  },
  leetcode: {
    name: "LeetCode",
    icon: FiCode,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
    order: 2,
  },
  codechef: {
    name: "CodeChef",
    icon: FiCoffee,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
    order: 3,
  },
};

const sortedPlatforms = Object.entries(platforms).sort(
  (a, b) => a[1].order - b[1].order
);

export default function FriendPage() {
  const [activeTab, setActiveTab] = useState("gfg");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const [Userdata, setUserData] = useState(Userdata1);
  const navigate = useNavigate();
  const { friendname } = useParams();
  const { userData, setIsAuthenticated } = useContext(UserContext);

  const getComparisonDisplay = (userValue, friendValue) => {
    if (userValue === friendValue)
      return { icon: FiMinus, color: "text-gray-400" };
    if (userValue > friendValue)
      return { icon: FiArrowUp, color: "text-green-400" };
    return { icon: FiArrowDown, color: "text-red-400" };
  };

  const filteredProblems =
    Userdata?.friend?.[`${activeTab}_data`]?.question_solved?.filter(
      (problem) => {
        const matchesSearch =
          problem.title &&
          problem.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty =
          difficultyFilter === "all" ||
          (problem.difficulty &&
            problem.difficulty.toLowerCase() ===
              difficultyFilter.toLowerCase());
        return matchesSearch && matchesDifficulty;
      }
    ) || [];

  const fetchUserData = async () => {
    try {
      // Redirect if the friend is "YOU"
      if (friendname === "YOU") {
        navigate(`/user`);
        return;
      }

      // Always fetch fresh data for the friend
      const response = await axios.get(
        `${baseUri}/user/compare/${friendname}`,
        {
          withCredentials: true,
        }
      );

      // Update cache
      localStorage.setItem(
        `FriendData${friendname}`,
        JSON.stringify(response.data)
      );
      localStorage.setItem(
        `FriendData${friendname}Timestamp`,
        new Date().getTime().toString()
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
    setIsAuthenticated(true);
  }, [friendname]);

  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`${baseUri}friend/remove/${friendname}`, {
        withCredentials: true,
      });

      // Clear the friend's cached data
      localStorage.removeItem(`FriendData${friendname}`);
      localStorage.removeItem(`FriendData${friendname}Timestamp`);

      // Clear user's cached data to refresh friend list
      localStorage.removeItem("userData");
      localStorage.removeItem("userDataTimestamp");

      // Navigate back to user's profile after removing friend
      navigate("/user");
    } catch (error) {
      console.error("Error removing friend:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

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
        {/* Friend Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
                <FiHexagon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {Userdata.friend.name}
                </h1>
              </div>
            </div>
            <button
              onClick={handleRemoveFriend}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
            >
              <FiUserMinus className="w-5 h-5" />
              Remove Friend
            </button>
          </div>

          {/* Comparison Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {sortedPlatforms.map(([key, platform]) => {
              const userData = Userdata.user[`${key}_data`];
              const friendData = Userdata.friend[`${key}_data`];
              const comparison = getComparisonDisplay(
                userData?.total_solved || 0,
                friendData?.total_solved || 0
              );
              const ComparisonIcon = comparison.icon;

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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Your Problems</span>
                      <span className="font-semibold">
                        {userData?.total_solved || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Friend's Problems</span>
                      <div className="flex items-center gap-2">
                        <ComparisonIcon
                          className={`w-4 h-4 ${comparison.color}`}
                        />
                        <span className="font-semibold">
                          {friendData?.total_solved || 0}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-lg bg-green-500/10">
                        <div className="text-green-400 font-bold flex items-center justify-center gap-1">
                          <span>{userData?.easy || 0}</span>
                          <span className="text-gray-400">/</span>
                          <span>{friendData?.easy || 0}</span>
                        </div>
                        <div className="text-xs text-gray-400">Easy</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-yellow-500/10">
                        <div className="text-yellow-400 font-bold flex items-center justify-center gap-1">
                          <span>{userData?.medium || 0}</span>
                          <span className="text-gray-400">/</span>
                          <span>{friendData?.medium || 0}</span>
                        </div>
                        <div className="text-xs text-gray-400">Medium</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-red-500/10">
                        <div className="text-red-400 font-bold flex items-center justify-center gap-1">
                          <span>{userData?.hard || 0}</span>
                          <span className="text-gray-400">/</span>
                          <span>{friendData?.hard || 0}</span>
                        </div>
                        <div className="text-xs text-gray-400">Hard</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Tabs */}
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
                    {/* Check if you've solved this problem */}
                    {Userdata.user[`${activeTab}_data`]?.question_solved?.some(
                      (q) => q.title === problem.title
                    ) && (
                      <div className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400 border border-green-500/20">
                        You solved this too!
                      </div>
                    )}
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
