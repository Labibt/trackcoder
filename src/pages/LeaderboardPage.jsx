import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/contextAPI";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import MatrixBackground from "../components/MatrixBackground";
import SearchBar from "../components/SearchBar";
import LeaderboardTable from "../components/LeaderboardTable";
import { fetchLeaderboard } from "../services/leaderboardService";
import { platforms } from "../data/platformData";

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("totalSolved");
  const [sortDirection, setSortDirection] = useState("desc");
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setIsAuthenticated } = useContext(UserContext);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const leaderboardData = await fetchLeaderboard();
        setAllUsers(leaderboardData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const filteredAndSortedUsers = Array.isArray(allUsers)
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
            aValue = a[sortKey]?.solved || 0;
            bValue = b[sortKey]?.solved || 0;
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

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 mt-10">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 mt-10">
        <ErrorPage error={error} />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-10">
      <MatrixBackground />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Leaderboard
        </h1>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search friends..."
        />

        <LeaderboardTable
          users={filteredAndSortedUsers}
          platforms={platforms}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}
