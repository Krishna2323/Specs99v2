import { createSlice } from "@reduxjs/toolkit";

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
    setHomeProducts(state, action) {
      state.eyeglasses = action.payload.eyeglasses || state.eyeglasses;
      state.eyeglassesIsLoading = action.payload.eyeglassesIsLoading;
      state.eyeglassesIsError = action.payload.eyeglassesIsError;
      state.eyeglassesMessage = action.payload.eyeglassesMessage;

      state.sunglasses = action.payload.sunglasses || state.sunglasses;
      state.sunglassesIsLoading = action.payload.sunglassesIsLoading;
      state.sunglassesIsError = action.payload.sunglassesIsError;
      state.sunglassesMessage = action.payload.sunglassesMessage;

      state.accessories = action.payload.accessories || state.accessories;
      state.accessoriesIsLoading = action.payload.accessoriesIsLoading;
      state.accessoriesIsError = action.payload.accessoriesIsError;
      state.accessoriesMessage = action.payload.accessoriesMessage;

      state.contactLenses = action.payload.contactLenses || state.contactLenses;
      state.contactLensesIsLoading = action.payload.contactLensesIsLoading;
      state.contactLensesIsError = action.payload.contactLensesIsError;
      state.contactLensesMessage = action.payload.contactLensesMessage;

      state.computerGlasses =
        action.payload.computerGlasses || state.computerGlasses;
      state.computerGlassesIsLoading = action.payload.computerGlassesIsLoading;
      state.computerGlassesIsError = action.payload.computerGlassesIsError;
      state.computerGlassesMessage = action.payload.computerGlassesMessage;
    },
  },
});

export const homeProductsSliceActions = homeProductsSlice.actions;

export default homeProductsSlice.reducer;
