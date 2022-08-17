import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import { productsSliceAction } from "./productsSlice";

export const fetchProducts = (filter, products) => {
  console.log(filter, products);
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
    page = 1,
    limit = 3,
  } = filter;

  return async (dispatch) => {
    let url = `/api/v1/products/?price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}&style=${style}&page=${page}&limit=${limit}`;

    if (keyword) {
      url = `/api/v1/products/?keyword=${keyword}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratingsAverage[gte]=${ratingsAverage}&modelType=${typeOfGlass}&size=${frameSize}&frameColor=${frameColor}&lensColor=${lensColor}&gender=${gender}&style=${style}&page=${page}&limit=${limit}`;
    }

    const fetchProductsFunc = async () => {
      dispatch(
        productsSliceAction.setProducts({
          isLoading: true,
          message: "Fetching Products",
          isError: false,
          products,
        })
      );

      const { data } = await axios.get(url);
      console.log(data);

      let productsMerged = data.data.data;

      if (products.length > 0) {
        productsMerged = [...new Set(products.concat(data.data.data))];
      }

      dispatch(
        productsSliceAction.setProducts({
          isLoading: false,
          message: "Products Fetched",
          products: productsMerged,
          totalProducts: data.results,
        })
      );
    };

    try {
      await fetchProductsFunc();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message || "Something Went Wrong!";
      dispatch(
        productsSliceAction.setProducts({
          isLoading: false,
          message: errorMessage.slice(0, 37),
          isError: true,
        })
      );
    }
  };
};
