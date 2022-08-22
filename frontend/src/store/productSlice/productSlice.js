import { createSlice } from "@reduxjs/toolkit";
import { setStateToPayload } from "../actionHelpers/setStateToPayload";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    isError: null,
    isLoading: false,
    message: "",
    similarProducts: [],
    similarProductsIsLoading: false,
    similarProductsIsError: false,
    similarProdcutsMessage: "",
    similarBrand: [],
    similarBrandIsLoading: false,
    similarBrandIsError: false,
    similarBrandMessage: "",
  },
  reducers: {
    setProduct(state, action) {
      state.product = action.payload.product;
      state.isError = action.payload.isError;
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
    setSimilarProducts(state, action) {
      setStateToPayload(state, action, "similarProducts");
    },
    setSimilarBrand(state, action) {
      setStateToPayload(state, action, "similarBrand");
    },
  },
});

export const productSliceAction = productSlice.actions;
export default productSlice.reducer;
