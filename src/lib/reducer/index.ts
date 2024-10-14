// /src/lib/action/reducer/index.tsx

import { combineReducers } from "@reduxjs/toolkit";

import weatherSlice from './weatherReducer';
import authSlice from './authReducer'

const rootReducer = combineReducers({
  weatherSlice,
  authSlice
});

export default rootReducer;
