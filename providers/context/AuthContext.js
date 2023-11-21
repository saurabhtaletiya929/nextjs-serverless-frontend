// context/AuthContext.js
import { createContext, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_DATA } from "~/components/Customer/Login/CustomerDataGraphql";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = (authToken) => {
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setToken(null);
  };

  const user = (userData) => {
    if (token && !userData) {
      if (data?.customer) {
        setUserData(data.customer);
      }
    }
  };
  const getUserData = () => {
    return userData;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
