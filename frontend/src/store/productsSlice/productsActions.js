import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import { productsSliceAction } from "./productsSlice";

export const fetchProducts = (filter) => {
  console.log(filter);
  const {
    keyword = "",
    minPrice = 0,
    maxPrice = 20000,
    ratingsAverage = 0,
    typeOfGlass = "",
    frameSize = "",
    frameColor = "",
    lensColor = "",
    gender = "",
    style = "",
  } = filter;

  return async (dispatch) => {
    let url = `/api/v1/products/?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}&style=${style}`;

    if (keyword) {
      url = `/api/v1/products/?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}&style=${style}`;
    }

    const fetchProductsFunc = async () => {
      dispatch(
        productsSliceAction.setProducts({
          isLoading: true,
          message: "Fetching Products",
          isError: false,
        })
      );

      const { data } = await axios.get(url);

      dispatch(
        productsSliceAction.setProducts({
          isLoading: false,
          message: "Products Fetched",
          products: data.data.data,
          totalProducts: data.results,
        })
      );
    };

    try {
      await fetchProductsFunc();
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something Went Wrong!";
      dispatch(
        productsSliceAction.setProducts({
          isLoading: false,
          message: errorMessage.slice(0, 37).padEnd(40, "..."),
          isError: true,
        })
      );
    }
  };
};
