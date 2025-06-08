import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUri } from "../data/constantLink";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to validate authentication
  const validateAuth = async () => {
    try {
      const response = await axios.get(`${baseUri}/auth/validateToken`, {
        withCredentials: true, // Ensure cookies are sent
      });
      setUserData(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication validation failed:", error);
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        setIsAuthenticated,
        validateAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
