// src/context/AuthContext.tsx

// import { ReactNode, createContext, useEffect, useState } from "react";
// import { getCookie, removeCookie, setCookie } from "typescript-cookie";

// import { User } from "../../types";

// // Define types for weather data and user



// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   login: (token: string, userData: User) => void;
//   logout: () => void;
//   checkAuthFromCookies: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     checkAuthFromCookies();
//   }, []);

//   const checkAuthFromCookies = () => {
//     const token = getCookie("auth_token");
//     const userData = getCookie("user_data");
//     if (token && userData) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(userData)); // Parse user data stored as a string
//     }
//   };

//   const login = (token: string, userData: User) => {
//     setCookie("auth_token", token, { expires: 7 }); // Save token for 7 days
//     setCookie("user_data", JSON.stringify(userData), { expires: 7 }); // Save user data
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     removeCookie("auth_token");
//     removeCookie("user_data");
//     setIsAuthenticated(false);
//     setUser(null); // Clear user data
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, user, login, logout, checkAuthFromCookies }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/UserContext.tsx
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "typescript-cookie";
import { User, UserState } from "../../types";
import { useAppSelector } from "../../lib";
import { authUser } from "../../lib/reducer/authReducer";

export const AuthContext = createContext<UserState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    const userCookie = getCookie("user_data");
    const token = getCookie("auth_token");  // Assuming token is stored in the cookie named "token"

    if (userCookie && token) {
      const user: User = JSON.parse(userCookie);
      dispatch(authUser({ user, token }));  // Pass both `currUser` and `token`
    }
  }, [dispatch]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
