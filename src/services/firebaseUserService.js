import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const fetchFirebaseUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }
    
    const userData = userDoc.data();
    
    // Add default data if missing
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

    userData.gfg_data = userData.gfg_data || { ...defaultPlatformData };
    userData.leetcode_data = userData.leetcode_data || { ...defaultPlatformData };
    userData.codechef_data = userData.codechef_data || { ...defaultPlatformData };
    
    return userData;
  } catch (error) {
    throw error;
  }
};

export const updateFirebaseProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    const updateData = {
      name: profileData.name,
      'leetcode_data.user_id': profileData.leetcodeId || 'N/A',
      'gfg_data.user_id': profileData.gfgId || 'N/A',
      'codechef_data.user_id': profileData.codechefId || 'N/A',
      notifications: {
        friendUpdates: profileData.friendUpdates,
        contestReminders: profileData.contestReminders
      }
    };
    
    await updateDoc(doc(db, 'users', user.uid), updateData);
    
    return { message: 'Profile updated successfully' };
  } catch (error) {
    throw error;
  }
};

export const fetchFirebaseLeaderboard = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Get current user data
    const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
    const currentUserData = currentUserDoc.data();
    
    // Get friends data
    const friendsData = [];
    if (currentUserData.friends && currentUserData.friends.length > 0) {
      for (const friendId of currentUserData.friends) {
        const friendDoc = await getDoc(doc(db, 'users', friendId));
        if (friendDoc.exists()) {
          friendsData.push(friendDoc.data());
        }
      }
    }
    
    // Format data for leaderboard
    const formatUserForLeaderboard = (userData) => ({
      user_id: userData.uid,
      name: userData.name,
      totalSolved: (userData.leetcode_data?.total_solved || 0) + 
                   (userData.gfg_data?.total_solved || 0) + 
                   (userData.codechef_data?.total_solved || 0),
      leetcode: {
        solved: userData.leetcode_data?.total_solved || 0,
        rating: userData.leetcode_data?.rating || 0
      },
      gfg: {
        solved: userData.gfg_data?.total_solved || 0,
        rating: userData.gfg_data?.rating || 0
      },
      codechef: {
        solved: userData.codechef_data?.total_solved || 0,
        rating: userData.codechef_data?.rating || 0
      }
    });
    
    const formattedCurrentUser = formatUserForLeaderboard(currentUserData);
    formattedCurrentUser.name = "YOU";
    
    const formattedFriends = friendsData.map(formatUserForLeaderboard);
    
    return {
      success: true,
      data: {
        user: formattedCurrentUser,
        friends: formattedFriends
      }
    };
  } catch (error) {
    throw error;
  }
};

export const addFirebaseFriend = async (friendData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Find friend by name
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', friendData.name));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Friend not found');
    }
    
    const friendDoc = querySnapshot.docs[0];
    const friendId = friendDoc.id;
    
    // Add friend to current user's friends list
    await updateDoc(doc(db, 'users', user.uid), {
      friends: arrayUnion(friendId)
    });
    
    return {
      status: 200,
      message: 'Friend added successfully!'
    };
  } catch (error) {
    throw error;
  }
};

export const removeFirebaseFriend = async (friendName) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Find friend by name
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', friendName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Friend not found');
    }
    
    const friendDoc = querySnapshot.docs[0];
    const friendId = friendDoc.id;
    
    // Remove friend from current user's friends list
    await updateDoc(doc(db, 'users', user.uid), {
      friends: arrayRemove(friendId)
    });
    
    return { message: 'Friend removed successfully' };
  } catch (error) {
    throw error;
  }
};

export const fetchFirebaseFriendData = async (friendName) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Get current user data
    const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
    const currentUserData = currentUserDoc.data();
    
    // Find friend by name
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', friendName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Friend not found');
    }
    
    const friendDoc = querySnapshot.docs[0];
    const friendData = friendDoc.data();
    
    return {
      user: currentUserData,
      friend: friendData
    };
  } catch (error) {
    throw error;
  }
};