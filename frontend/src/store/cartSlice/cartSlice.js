import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalProducts: 0,
    status: "",
    message: "",
    isLoading: false,
  },

  reducers: {
    setCart(state, action) {
      state.isLoading = action.payload.isLoading;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
    },
    addItem(state, action) {
      state.products = action.payload.products;
      state.totalProducts = state.totalProducts++;
    },
  },
});

export const cartSliceAction = cartSlice.actions;

export default cartSlice.reducer;
