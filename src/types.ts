// src/types.ts

export interface Weather {
  iconURl: string | undefined;
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  population?: number;
}

export interface Forecast {
  dt: number;
  dt_txt: string;
  weather: [
    {
      description: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
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

// export interface SearchFormValue {
//   city: string;
// }