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
    },
  },
});

export const productsSliceAction = productsSlice.actions;

export default productsSlice.reducer;
