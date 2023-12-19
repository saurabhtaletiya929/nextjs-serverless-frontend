// context/AuthContext.js
import { createContext, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_DATA } from "~/components/Customer/Login/CustomerDataGraphql";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data } = useQuery(GET_CUSTOMER_DATA);
  const userInfo = data;
  const login = (authToken) => {
    setToken(authToken);
    localStorage.setItem("token", authToken);
    user(data);
  };

  const logout = () => {
    router.push("/customer/account/logoutsuccess");
    localStorage.setItem("token", null);
    setToken(null);
    setUserData(null);
  };
  const user = () => {
    if (token && userInfo) {
      setUserData(userInfo);
    }
  };
  // const getUserData = () => {
  //   return userData;
  // };

  return (
    <AuthContext.Provider
      value={{ login, logout, token, setToken, userData, setUserData, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
