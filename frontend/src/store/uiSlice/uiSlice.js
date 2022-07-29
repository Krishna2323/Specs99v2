import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cart: false, loginForm: false, singupForm: false },
  reducers: {
    setCart(state, actions) {
      state.cart = !state.cart;
    },
    setLoginForm(state, actions) {
      state.loginForm = !state.loginForm;
    },
    setSignUpForm(state) {
      state.singupForm = !state.singupForm;
    },
    toggleLoginSingup(state, actions) {
      state.loginForm = !state.loginForm;
      state.singupForm = !state.singupForm;
    },
  },
});

export const uiSliceAction = uiSlice.actions;
export default uiSlice.reducer;
