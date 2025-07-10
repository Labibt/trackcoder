import { 
  firebaseLogin, 
  firebaseRegister, 
  firebaseGuestLogin 
} from './firebaseAuthService';

export const login = firebaseLogin;

export const register = firebaseRegister;

export const guestLogin = firebaseGuestLogin;