import React from "react";
import { Link } from "react-router-dom";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const LeaderboardTable = ({
  users,
  platforms,
  sortKey,
  sortDirection,
  onSort,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Name</th>
            <th
              className="p-3 text-left cursor-pointer hover:bg-gray-700/50"
              onClick={() => onSort("totalSolved")}
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
                onClick={() => onSort(key)}
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
          {users.map((user, index) => (
            <tr
              key={user.user_id}
              className="border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-colors"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-medium">
                <Link
                  to={`/user/${
                    user.name === "YOU" ? "" : `friend/${user.name}`
                  }`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {user.name}
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
  );
};

export default LeaderboardTable;
