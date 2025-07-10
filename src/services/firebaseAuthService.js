import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const firebaseLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userid", user.uid);
    localStorage.setItem("isLoggedIn", "true");
    
    return { user: userData };
  } catch (error) {
    throw error;
  }
};

export const firebaseRegister = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      formData.email, 
      formData.password
    );
    const user = userCredential.user;
    
    // Create user profile in Firestore
    const userProfile = {
      uid: user.uid,
      name: formData.name,
      email: formData.email,
      user_id: formData.name.toLowerCase().replace(/\s+/g, ''),
      leetcode_data: {
        user_id: formData.leetcode_id || 'N/A',
        total_solved: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        rating: 0,
        badge: 'No Badge',
        question_solved: []
      },
      gfg_data: {
        user_id: formData.gfg_id || 'N/A',
        total_solved: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        rating: 0,
        badge: 'No Badge',
        question_solved: []
      },
      codechef_data: {
        user_id: formData.codechef_id || 'N/A',
        total_solved: 0,
        rating: 0,
        badge: 'No Badge',
        question_solved: []
      },
      friends: [],
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    return { message: 'User registered successfully' };
  } catch (error) {
    throw error;
  }
};

export const firebaseGuestLogin = async () => {
  // Use the guest account you created in Firebase
  return await firebaseLogin("labibt42@gmail.com", "guestpassword123");
};

export const firebaseLogout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    localStorage.removeItem("isLoggedIn");
  } catch (error) {
    throw error;
  }
};

export const firebaseChangePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
    
    return { message: 'Password updated successfully' };
  } catch (error) {
    throw error;
  }
};