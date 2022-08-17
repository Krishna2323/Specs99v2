import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalProducts: 0,
    isLoading: false,
    isError: false,
    message: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
      state.isError = action.payload.isError;
    },
    clearProducts(state, action) {
      state.products = [];
    },
  },
});

export const productsSliceAction = productsSlice.actions;

export default productsSlice.reducer;
