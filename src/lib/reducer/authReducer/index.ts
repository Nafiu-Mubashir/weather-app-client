import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User, UserState } from "../../../types";

const initialState: UserState = {
  loading: false,
  error: null,
  success: null,
  user: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state) {
      state.loading = false;
      state.success = null;
    },
    authUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null; // Reset token as well
    },
  },
});

export const { authSuccess, authFailure, authUser, logout } = authSlice.actions;

export default authSlice.reducer;
