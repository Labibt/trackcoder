import axios from "axios";
import { baseUri } from "../data/constantLink";

export const fetchFriendData = async (friendname) => {
  try {
    const response = await axios.get(
      `${baseUri}/user/compare/${friendname}`,
      {
        withCredentials: true,
      }
    );
  console.log(response);
  
    // Update cache
    localStorage.setItem(
      `FriendData${friendname}`,
      JSON.stringify(response.data)
    );
    localStorage.setItem(
      `FriendData${friendname}Timestamp`,
      new Date().getTime().toString()
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFriend = async (friendname) => {
  try {
    await axios.delete(`${baseUri}friend/remove/${friendname}`, {
      withCredentials: true,
    });

    // Clear the friend's cached data
    localStorage.removeItem(`FriendData${friendname}`);
    localStorage.removeItem(`FriendData${friendname}Timestamp`);

    // Clear user's cached data to refresh friend list
    localStorage.removeItem("userData");
    localStorage.removeItem("userDataTimestamp");

    return true;
  } catch (error) {
    throw error;
  }
};

export const addFriend = async (friendData) => {
  try {
    const response = await axios.post(`${baseUri}/friend/add`, friendData, {
      withCredentials: true,
    });
    
    if (response.data.status === 200) {
      return {
        success: true,
        message: response.data.message || "Friend added successfully! Data is fetching."
      };
    }
    
    return {
      success: false,
      message: response.data.message || "Failed to add friend. Please try again."
    };
  } catch (error) {
    console.error("Error adding friend:", error);
    throw new Error("Failed to add friend. Please check your network or try again later.");
  }
}; 