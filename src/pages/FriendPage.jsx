import React, { useEffect, useState, useContext } from "react";
import { FiHexagon, FiUserMinus } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextAPI";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import MatrixBackground from "../components/MatrixBackground";
import PlatformStatsCard from "../components/PlatformStatsCard";
import PlatformTabs from "../components/PlatformTabs";
import ProblemList from "../components/ProblemList";
import { platforms, getSortedPlatforms } from "../data/platformData";
import { fetchFriendData, removeFriend } from "../services/friendService";

const CACHE_EXPIRATION_TIME = 1 * 60 * 1000;

export default function FriendPage() {
  const [activeTab, setActiveTab] = useState("gfg");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Userdata, setUserData] = useState(null);
  const navigate = useNavigate();
  const { friendname } = useParams();
  const { userData, setIsAuthenticated } = useContext(UserContext);

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

  const fetchData = async () => {
    try {
      if (friendname === "YOU") {
        navigate(`/user`);
        return;
      }

      const data = await fetchFriendData(friendname);
      setIsLoading(false);
      setError(null);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
    setIsAuthenticated(true);
  }, [friendname]);

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(friendname);
      navigate("/user");
    } catch (error) {
      console.error("Error removing friend:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

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
            {getSortedPlatforms().map(([key, platform]) => (
              <PlatformStatsCard
                key={key}
                platform={platform}
                userData={Userdata.user[`${key}_data`]}
                friendData={Userdata.friend[`${key}_data`]}
                showComparison={true}
              />
            ))}
          </div>
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
          showSolvedIndicator={true}
          userProblems={
            Userdata.user[`${activeTab}_data`]?.question_solved || []
          }
        />
      </div>
    </div>
  );
}
