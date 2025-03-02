import { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        friends,
        setFriends,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
