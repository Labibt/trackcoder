import axios from "axios";
import { baseUri } from "../data/constantLink";

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.post(
      `${baseUri}/auth/updateUserProfile`,
      profileData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response;
  }
};
