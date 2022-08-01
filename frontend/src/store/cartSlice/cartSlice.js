import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalProducts: 0,
    status: "",
    message: "",
    isLoading: false,
    totalCost: 0,
    isError: false,
  },

  reducers: {
    setCart(state, action) {
      state.isLoading = action.payload.isLoading;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.totalCost = action.payload.totalCost;
      state.isError = action.payload.isError;
    },
    addItem(state, action) {
      state.products = action.payload.products;
      state.totalProducts = state.totalProducts++;
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
    },
  },
});

export const cartSliceAction = cartSlice.actions;

export default cartSlice.reducer;
