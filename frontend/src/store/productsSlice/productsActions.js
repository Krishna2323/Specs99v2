import axios from "axios";
import { clearNotication } from "../notificationSlice/notificationSlice";
import { productsSliceAction } from "./productsSlice";

export const fetchProducts = (keyword, minPrice = 0) => {
  // const { brand = "" } = filter;

  return async (dispatch) => {
    let url = `/api/v1/products/?price[gte]=${minPrice}`;

    if (keyword) {
      url = `/api/v1/products/?keyword=${keyword}&price[gte]=${minPrice}`;
    }

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
      const errorMessage = "Something Went Wrong!";
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
