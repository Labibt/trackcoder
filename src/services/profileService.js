import { updateFirebaseProfile } from './firebaseUserService';

export const updateProfile = async (profileData) => {
  try {
    const response = await updateFirebaseProfile(profileData);
    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw { data: { message: error.message } };
  }
};