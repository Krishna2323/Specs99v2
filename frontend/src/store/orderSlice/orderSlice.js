import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isLoading: false,
    isError: false,
    message: "",
    status: "",
  },
  reducers: {
    createOrder(state, action) {
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    setOrder(state, action) {
      state.orders = action.payload.orders;
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      state.message = action.payload.message;
    },
  },
});

export const orderSliceAction = orderSlice.actions;
export default orderSlice.reducer;
