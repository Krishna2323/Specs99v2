import { createSlice } from "@reduxjs/toolkit";
import { setStateToPayload } from "../actionHelpers/setStateToPayload";

const homeProductsSlice = createSlice({
  name: "homeProducts",
  initialState: {
    sunglasses: [],
    sunglassesIsLoading: false,
    sunglassesIsError: false,
    sunglassesMessage: false,

    eyeglasses: [],
    eyeglassesIsLoading: false,
    eyeglassesIsError: false,
    eyeglassesMessage: false,

    accessories: [],
    accessoriesIsLoading: false,
    accessoriesIsError: false,
    accessoriesMessage: false,

    contactLenses: [],
    contactLensesIsLoading: false,
    contactLensesIsError: false,
    contactLensesMessage: false,

    computerGlasses: [],
    computerGlassesIsLoading: false,
    computerGlassesIsError: false,
    computerGlassesMessage: false,
  },
  reducers: {
    setHomeEyeglasses(state, action) {
      setStateToPayload(state, action, "eyeglasses");
    },
    setHomeSunglasses(state, action) {
      setStateToPayload(state, action, "sunglasses");
    },
    setHomeAccessories(state, action) {
      setStateToPayload(state, action, "accessories");
    },
    setHomeContactLenses(state, action) {
      setStateToPayload(state, action, "contactLenses");
    },
    setHomeComputerGlasses(state, action) {
      setStateToPayload(state, action, "computerGlasses");
    },
  },
});

export const homeProductsSliceActions = homeProductsSlice.actions;

export default homeProductsSlice.reducer;
