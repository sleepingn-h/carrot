import type { RootState } from '@/model/redux';
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  email: string | null;
  userName: string | null;
  userID: string | null;
  isAdmin: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID, isAdmin } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.isAdmin = isAdmin;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.isAdmin = false;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserID = (state: RootState) => state.auth.userID;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;

export default authSlice.reducer;
