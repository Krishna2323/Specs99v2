import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.userData;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    signupUser(state, action) {
      state.user = action.payload.userData;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    updateDetail(state, action) {
      state.user = action.payload.user || state.user;
      state.isError = action.payload.isError;
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
