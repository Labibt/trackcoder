import { 
  addFirebaseFriend, 
  removeFirebaseFriend, 
  fetchFirebaseFriendData 
} from './firebaseUserService';

export const fetchFriendData = async (friendname) => {
  try {
    const data = await fetchFirebaseFriendData(friendname);
    
    // Update cache
    localStorage.setItem(
      `FriendData${friendname}`,
      JSON.stringify(data)
    );
    localStorage.setItem(
      `FriendData${friendname}Timestamp`,
      new Date().getTime().toString()
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const removeFriend = async (friendname) => {
  try {
    await removeFirebaseFriend(friendname);

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
    const response = await addFirebaseFriend(friendData);
    
    if (response.status === 200) {
      return {
        success: true,
        message: response.message || "Friend added successfully! Data is fetching."
      };
    }
    
    return {
      success: false,
      message: response.message || "Failed to add friend. Please try again."
    };
  } catch (error) {
    console.error("Error adding friend:", error);
    throw new Error(error.message || "Failed to add friend. Please check your network or try again later.");
  }
};