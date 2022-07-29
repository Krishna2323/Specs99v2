import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { product: null, isError: null, isLoading: false, message: "" },
  reducers: {
    setProduct(state, action) {
      state.product = action.payload.product;
      state.isError = action.payload.isError;
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
  },
});

export const productSliceAction = productSlice.actions;
export default productSlice.reducer;
