import React from "react";
import { FiSearch, FiGitBranch } from "react-icons/fi";

// Add DifficultyFilters component
const DifficultyFilters = ({ difficultyFilter, setDifficultyFilter }) => (
  <div className="flex gap-2">
    {["all", "Easy", "Medium", "Hard"].map((difficulty) => (
      <button
        key={difficulty}
        onClick={() => setDifficultyFilter(difficulty)}
        className={`px-3 py-1 rounded-full text-sm transition-all ${
          difficultyFilter === difficulty
            ? `bg-${
                difficulty === "all" ? "blue" : difficulty.toLowerCase()
              }-500/20 
               text-${
                 difficulty === "all" ? "blue" : difficulty.toLowerCase()
               }-400 
               border border-${
                 difficulty === "all" ? "blue" : difficulty.toLowerCase()
               }-500/20`
            : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700/50"
        }`}
      >
        {difficulty}
      </button>
    ))}
  </div>
);

// Add ProblemItems component
const ProblemItems = ({
  problems,
  platforms,
  activeTab,
  userSolvedProblems,
}) => (
  <div className="space-y-4">
    {problems?.length > 0 ? (
      problems.map((problem) => (
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
            {userSolvedProblems?.some((q) => q.title === problem.title) && (
              <div className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400 border border-green-500/20">
                You solved this too!
              </div>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-400">
        No problems found matching your criteria
      </div>
    )}
  </div>
);

export default function ProblemList({
  searchTerm,
  setSearchTerm,
  difficultyFilter,
  setDifficultyFilter,
  problems,
  platforms,
  activeTab,
  userSolvedProblems = [],
}) {
  return (
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

      <DifficultyFilters
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
      />

      <ProblemItems
        problems={problems}
        platforms={platforms}
        activeTab={activeTab}
        userSolvedProblems={userSolvedProblems}
      />
    </div>
  );
}
