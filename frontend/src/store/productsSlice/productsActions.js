import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import { productsSliceAction } from "./productsSlice";

export const fetchProducts = (
  keyword,
  minPrice = 0,
  maxPrice = 20000,
  ratingsAverage = 0,
  typeOfGlass = "",
  frameSize = "",
  frameColor = "",
  lensColor = "",
  gender = ""
) => {
  // const { brand = "" } = filter;

  return async (dispatch) => {
    let url = `/api/v1/products/?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}`;

    if (keyword) {
      url = `/api/v1/products/?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}`;
    }

    // if (keyword && frameSize) {
    //   url = `/api/v1/products/?keyword=${keyword}&price[gte]=${minPrice}&size=${frameSize}`;
    // } else if (frameSize) {
    //   url = `/api/v1/products/?price[gte]=${minPrice}&size=${frameSize}`;
    // }

    const fetchProductsFunc = async () => {
      dispatch(
        productsSliceAction.setProducts({
          isLoading: true,
          message: "Fetching Products",
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
          message: errorMessage,
          isError: true,
        })
      );
    }
  };
};
