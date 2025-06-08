import axios from "axios";
import { baseUri } from "../data/constantLink";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseUri}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("userid", response.data.user._id);
      localStorage.setItem("isLoggedIn", "true");
      return response.data;
    }
    throw new Error("Login failed");
  } catch (error) {
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${baseUri}/auth/register`, formData);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error("Registration failed");
  } catch (error) {
    throw error;
  }
};

export const guestLogin = async () => {
  try {
    const response = await axios.post(
      `${baseUri}/auth/login`,
      {
        email: "testuserLGC3@example.com",
        password: "SecurePassword123",
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userid", response.data.user._id);
      localStorage.setItem("user", response.data.user);
      return response.data;
    }
    throw new Error("Guest login failed");
  } catch (error) {
    throw error;
  }
}; 