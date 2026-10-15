import { createContext, useContext, useState } from "react";

import {
  login as loginRequest,
  getCurrentUser,
} from "../services/auth";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const signIn = async(email, password) => {
    const { access_token } = await loginRequest(email, password);

    const currentUser = await getCurrentUser(access_token);

    setToken(access_token);
    setUser(currentUser);

    return currentUser;
  }

  const signOut = () => {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}