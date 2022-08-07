import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cart: false,
    loginForm: false,
    signupForm: false,
    adminSidebar: false,
  },
  reducers: {
    setCart(state, actions) {
      state.cart = !state.cart;
    },
    setLoginForm(state, actions) {
      state.loginForm = !state.loginForm;
    },
    setSignUpForm(state) {
      state.signupForm = !state.signupForm;
    },
    toggleLoginSignup(state, actions) {
      state.loginForm = !state.loginForm;
      state.signupForm = !state.signupForm;
    },
    toggleAdminSidebar(state, action) {
      state.adminSidebar = !state.adminSidebar;
    },
  },
});

export const uiSliceAction = uiSlice.actions;
export default uiSlice.reducer;
