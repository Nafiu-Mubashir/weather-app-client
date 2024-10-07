// src/context/AuthContext.tsx

import { ReactNode, createContext, useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

// Define types for weather data and user
interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
    iconUrl: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  iconUrl: string;
}

interface Forecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
    iconUrl: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  searchHistory: Weather; // Replace with appropriate type if needed
  weatherData: {
    currentWeather: Weather;
    forecast: Forecast[];
    weatherMapUrl: string;
  };
}

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
    setUser(userData);
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
