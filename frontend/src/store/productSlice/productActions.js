import axios from "axios";
import { notificationActions } from "../notificationSlice/notificationSlice";
import { productSliceAction } from "./productSlice";

export const addProduct = (data) => {
  return async (dispatch) => {
    const addProductPost = async () => {
      dispatch(
        notificationActions.setNotification({
          status: "Loading",
          type: "loading",
          message: "Sending Request",
        })
      );

      const res = await axios.post("/api/v1/products", data);

      console.log(res);

      dispatch(
        notificationActions.setNotification({
          status: "Success",
          type: "success",
          message: "Product Added Successfully.",
        })
      );
    };

    try {
      await addProductPost();
    } catch (error) {
      console.log(error);
      dispatch(
        notificationActions.setNotification({
          status: "Error",
          type: "error",
          message: "Something Went Wrong.",
        })
      );
    }
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const fetchFunction = async () => {
      dispatch(
        productSliceAction.setProduct({
          isLoading: true,
          message: "Fetching Product",
          isError: false,
        })
      );

      const res = await axios.get(`/api/v1/products/${id}`);

      const { data } = res.data;

      dispatch(
        productSliceAction.setProduct({
          product: data.data,
          isLoading: false,
          message: "Product Fetched",
        })
      );
    };

    try {
      await fetchFunction();
    } catch (error) {
      console.log(error);
      const errorMessage = "Something Went Wrong!";
      dispatch(
        productSliceAction.setProduct({
          isLoading: false,
          message: errorMessage,
          isError: true,
        })
      );
    }
  };
};
