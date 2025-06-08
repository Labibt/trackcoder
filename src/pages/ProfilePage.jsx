import React, { useState, useEffect, useContext } from "react";
import { FiHexagon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextAPI";
import { fetchUserProfile } from "../services/fetchUserProfile";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import MatrixBackground from "../components/MatrixBackground";
import PlatformStatsCard from "../components/PlatformStatsCard";
import PlatformTabs from "../components/PlatformTabs";
import ProblemList from "../components/ProblemList";
import { platforms, getSortedPlatforms } from "../data/platformData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("gfg");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, setUserData, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setUserData(data);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setUserData, navigate]);

  const handleNavigation = () => {
    navigate("leaderboard");
  };

  const filteredProblems =
    userData?.[`${activeTab}_data`]?.question_solved?.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" ||
        (problem.difficulty &&
          problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
      return matchesSearch && matchesDifficulty;
    }) || [];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-10">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-10">
        <ErrorPage error={error} />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-10">
      <MatrixBackground />

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
                {userData?.name}
              </h1>
              <p className="text-gray-400">@{userData?.user_id}</p>
            </div>
          </div>

          {/* Total Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm hover:scale-105 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="text-2xl font-bold text-blue-400">
                {Object.values(platforms).reduce(
                  (total, platform) =>
                    total +
                    (userData?.[`${platform.name.toLowerCase()}_data`]
                      ?.total_solved || 0),
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
                {userData?.friends.length}
              </div>
              <div className="text-sm text-gray-400">Friends</div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm hover:scale-105 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/20 transition-all">
              <div className="text-2xl font-bold text-green-400">
                {Math.max(
                  ...Object.values(platforms).map(
                    (p) =>
                      userData?.[`${p.name.toLowerCase()}_data`]?.rating || 0
                  )
                )}
              </div>
              <div className="text-sm text-gray-400">Best Rating</div>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm hover:scale-105 hover:bg-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
              <div className="text-2xl font-bold text-yellow-400">
                {userData?.leetcode_data?.badge || "No Badge"}
              </div>
              <div className="text-sm text-gray-400">Current Badge</div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {getSortedPlatforms().map(([key, platform]) => (
            <PlatformStatsCard
              key={key}
              platform={platform}
              userData={userData?.[`${key}_data`]}
            />
          ))}
        </div>

        {/* Platform Tabs */}
        <PlatformTabs
          platforms={getSortedPlatforms()}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Problem List */}
        <ProblemList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          filteredProblems={filteredProblems}
          activePlatform={platforms[activeTab]}
        />
      </div>
    </div>
  );
}
