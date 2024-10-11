// /src/lib/action/reducer/videoSlice/index.tsx

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { WeatherRepose } from "../../../types";

export interface WeatherSate {
  // Ensure this is exported
  loading: boolean;
  error: string | null;
  success: string | null;
  weatherData: WeatherRepose | null;
}

const initialState: WeatherSate = {
  loading: false,
  error: null,
  success: null,
  weatherData: null,
};

const weatherSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
  
    weatherFetchSuccess(state, action: PayloadAction<WeatherRepose>) {
      state.loading = false;
      state.success = "Video uploaded successfully";
      state.weatherData = action.payload;
    },
    weatherFetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWeatherSuccess(state, action: PayloadAction<WeatherRepose>) {
      state.loading = false;
      state.weatherData = action.payload;
    },
   
  },
});

export const {
  weatherFetchSuccess,
  weatherFetchFailure,
  fetchWeatherSuccess,
} = weatherSlice.actions;

export default weatherSlice.reducer;
