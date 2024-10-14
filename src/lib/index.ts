// /src/lib/store.tsx

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

// Create a persist configuration
const persistConfig = {
  key: "root", // key for the persisted state
  storage, // Use localStorage for persistence
  whitelist: ["weatherSlice", ""], // Persist both weather and auth slices
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

// Create the persistor for use in PersistGate
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

// Typed selector hook for using throughout your app
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
