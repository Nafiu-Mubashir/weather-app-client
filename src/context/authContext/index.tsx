// src/context/AuthContext.tsx

import { ReactNode, createContext, useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

// Define user data type with specific fields
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the AuthContext interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuthFromCookies: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthFromCookies();
  }, []);

  // Check auth from cookies and load user data
  const checkAuthFromCookies = () => {
    const token = getCookie("auth_token");
    const userData = getCookie("user_data");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData)); // Parse user data stored as a string
    }
  };

  const login = (token: string, userData: User) => {
    setCookie("auth_token", token, { expires: 7 }); // Save token for 7 days
    setCookie("user_data", JSON.stringify(userData), { expires: 7 }); // Save user data
    setIsAuthenticated(true);
    setUser(userData); // Set user data globally
  };

  const logout = () => {
    removeCookie("auth_token");
    removeCookie("user_data");
    setIsAuthenticated(false);
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, checkAuthFromCookies }}>
      {children}
    </AuthContext.Provider>
  );
};
