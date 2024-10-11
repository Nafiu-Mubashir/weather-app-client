import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import {
  Action,
  ThunkAction,
  configureStore,
  // getDefaultMiddleware,
} from "@reduxjs/toolkit";

import rootReducer from "./reducer";

// Create a persist configuration
const persistConfig = {
  key: "root", // key for the persisted state
  storage, // localStorage will be used
  whitelist: ["weather"], // Add the slice names that you want to persist
};

// Create a persisted reducer using the persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and customized middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
