import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // or use <a> tag for simpler navigation
import {
  FiCode,
  FiCoffee,
  FiBook,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import axios from "axios";

// Mock data structure matching API response

const platforms = {
  leetcode: {
    name: "LeetCode",
    icon: FiCode,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  gfg: {
    name: "GeeksforGeeks",
    icon: FiBook,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  codechef: {
    name: "CodeChef",
    icon: FiCoffee,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
};

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("totalSolved");
  const [sortDirection, setSortDirection] = useState("desc");
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userId] = useParams();
  const [userId, setuserId] = useState();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log("Fetching leaderboard data...");

        const response = await axios.get(
          "http://localhost:5000/api/user/testuserLGC3/leaderboard",
          { withCredentials: true }
        );

        // console.log("API Response Data:", response.data);

        if (response.status === 200 && response.data.success) {
          const { friends, user } = response.data.data;
          console.log(friends);

          setuserId(user.user_id);
          user.name = "YOU";
          const leaderboardData = [user, ...friends];
          setAllUsers(leaderboardData);
          console.log(leaderboardData);
        } else {
          setError("Failed to load leaderboard data.");
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredAndSortedUsers = Array.isArray(allUsers) // Ensure allUsers is an array
    ? allUsers
        .filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          let aValue, bValue;

          if (sortKey === "totalSolved") {
            aValue = a.totalSolved;
            bValue = b.totalSolved;
          } else {
            aValue = a[sortKey]?.solved || 0; // Handle undefined keys
            bValue = b[sortKey]?.solved || 0; // Handle undefined keys
          }

          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        })
    : [];

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  // if (loading) return <p>Loading leaderboard...</p>;
  // if (error) return <p>Error: {error}</p>;

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
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Leaderboard
        </h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
          />
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400">
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th
                  className="p-3 text-left cursor-pointer hover:bg-gray-700/50"
                  onClick={() => handleSort("totalSolved")}
                >
                  <div className="flex items-center">
                    Total Solved
                    {sortKey === "totalSolved" &&
                      (sortDirection === "asc" ? (
                        <FiChevronUp className="ml-1" />
                      ) : (
                        <FiChevronDown className="ml-1" />
                      ))}
                  </div>
                </th>
                {Object.entries(platforms).map(([key, platform]) => (
                  <th
                    key={key}
                    className="p-3 text-left cursor-pointer hover:bg-gray-700/50"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center">
                      <platform.icon className={`mr-2 ${platform.color}`} />
                      {platform.name}
                      {sortKey === key &&
                        (sortDirection === "asc" ? (
                          <FiChevronUp className="ml-1" />
                        ) : (
                          <FiChevronDown className="ml-1" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map((user, index) => (
                <tr
                  key={user.user_id}
                  className="border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-colors"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">
                    <Link
                      to={`/user/${
                        user.name == "YOU" ? "" : `friend/${user.name}`
                      }`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {user.name}{" "}
                      {/* <span className="text-gray-400">[{user.user_id}]</span> */}
                    </Link>
                  </td>
                  <td className="p-3">{user.totalSolved}</td>
                  {Object.entries(platforms).map(([key, platform]) => (
                    <td key={key} className="p-3">
                      <div className="flex items-center">
                        <span className="mr-2">{user[key].solved}</span>
                        <span
                          className={`text-xs ${platform.bgColor} ${platform.color} px-2 py-1 rounded-full`}
                        >
                          {user[key].rating}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
