import axios from "axios";
import { baseUri } from "../data/constantData";
import Layout from "../layout/layout";

export const fetchUserProfile = async () => {
  try {
    // Ensure withCredentials is enabled to include cookies
    const response = await axios.get(`${baseUri}/user/profile`, {
      withCredentials: true,
    });
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

    // Add default data if any platform is missing or incomplete
    response.data.gfg_data = response.data.gfg_data || {
      ...defaultPlatformData,
    };
    response.data.leetcode_data = response.data.leetcode_data || {
      ...defaultPlatformData,
    };
    response.data.codechef_data = response.data.codechef_data || {
      ...defaultPlatformData,
    };

    console.log("Profile data:", response.data);
    return response.data; // Return the profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch user profile."
    );
  }
};
