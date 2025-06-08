import { FiCode, FiCoffee, FiBook } from "react-icons/fi";

export const platforms = {
  leetcode: {
    name: "LeetCode",
    icon: FiCode,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-300",
  },
  gfg: {
    name: "GeeksforGeeks",
    icon: FiBook,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-300",
  },
  codechef: {
    name: "CodeChef",
    icon: FiCoffee,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-300",
  },
};

export const defaultPlatformData = {
  question_solved: [],
  total_solved: 0,
  rating: 0,
  badge: "No Badge",
  user_id: "N/A",
  easy: 0,
  medium: 0,
  hard: 0,
};

export const getSortedPlatforms = () => {
  return Object.entries(platforms).sort((a, b) => a[1].order - b[1].order);
}; 