import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: {},
  isLoggedIn: false,
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
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
