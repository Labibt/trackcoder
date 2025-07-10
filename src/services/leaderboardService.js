import { fetchFirebaseLeaderboard } from './firebaseUserService';

export const fetchLeaderboard = async () => {
  try {
    const response = await fetchFirebaseLeaderboard();

    if (response.success) {
      const { friends, user } = response.data;
      user.name = "YOU";
      return [user, ...friends];
    }
    throw new Error("Failed to load leaderboard data.");
  } catch (error) {
    throw error;
  }
};