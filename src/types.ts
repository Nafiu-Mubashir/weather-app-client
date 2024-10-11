// src/types.ts

import History from './pages/history/index';

export interface Weather {
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

export interface Forecast {
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

export interface History {
  city: string;
  country: string;
  searchedAt: string;
  weatherData: {
    windSpeed: number;
    humidity: number;
    pressure: number;
    temperature: number;
    airPollution: string;
    cloads: number;
  }
  id: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  searchHistory: History;
}
//Auth types
export interface LoginFormValues {
  email: string;
  password: string;
}
export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
}

export interface WeatherRepose {
  userInfo: User;
  weatherData: {
    currentWeather: Weather;
    forecast: Forecast[]; // This should be an array
  };
  weatherSearchHistory: History[];
}

export interface DashboardResponse {
  status: number;
  data: {
    message: string;
    payload: WeatherRepose;
    success: string;
  };
}