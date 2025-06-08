import axios from "axios";
import { baseUri } from "../data/constantLink";

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${baseUri}/user/leaderboard`, {
      withCredentials: true,
    });

    if (response.status === 200 && response.data.success) {
      const { friends, user } = response.data.data;
      user.name = "YOU";
      return [user, ...friends];
    }
    throw new Error("Failed to load leaderboard data.");
  } catch (error) {
    throw error;
  }
}; 