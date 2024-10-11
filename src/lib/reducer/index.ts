// /src/lib/action/reducer/index.tsx

import { combineReducers } from "@reduxjs/toolkit";

import weatherSlice from './weatherReducer/index';

const rootReducer = combineReducers({
  weatherSlice
});

export default rootReducer;
