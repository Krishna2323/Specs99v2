import axios from "axios";
import {
  clearNotication,
  notificationActions,
} from "../notificationSlice/notificationSlice";
import { productSliceAction } from "./productSlice";
import { dispatchNotification } from "../helper/helper";
import { fecthData } from "../actionHelpers/fetchData";

export const addProduct = (data) => {
  return async (dispatch) => {
    const addProductPost = async () => {
      dispatchNotification(
        dispatch,
        "loading",
        "Loading",
        "Sending Request",
        "addProduct"
      );

      await axios.post("/api/v1/products", data);

      dispatchNotification(
        dispatch,
        "success",
        "Success",
        "Product Added Successfully",
        "addProduct"
      );

      dispatch(clearNotication());
    };

    try {
      await addProductPost();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message || "Something Went Wrong!";

      dispatchNotification(
        dispatch,
        "error",
        "Error",
        errorMessage,
        "addProduct"
      );
      dispatch(clearNotication());
    }
  };
};

export const updateProduct = (id, product) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatchNotification(
        dispatch,
        "loading",
        "Updating",
        "Request Sent",
        "updateProduct"
      );
      await axios.patch(`/api/v1/products/${id}`, product);

      dispatchNotification(
        dispatch,
        "success",
        "Success",
        "Product Updated",
        "updateProduct"
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something Went Wrong";
      dispatchNotification(
        dispatch,
        "error",
        "Error",
        errorMessage,
        "updateProduct"
      );
    }

    dispatch(clearNotication());
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatchNotification(
        dispatch,
        "loading",
        "Loading",
        "Deleting Product",
        "deleteProduct"
      );

      await axios.delete(`/api/v1/products/${id}`);
      dispatch(
        notificationActions.setNotification({
          status: "Success",
          type: "success",
          message: "Product Deleted",
        })
      );

      dispatchNotification(
        dispatch,
        "success",
        "Success",
        "Product Deleted",
        "deleteProduct"
      );
    };

    try {
      await sendRequest();
      dispatch(clearNotication());
      dispatch(fetchProduct({}));
    } catch (error) {
      const errorMessage =
        error.response.data.message || "Something Went Wrong!";
      dispatchNotification(
        dispatch,
        "error",
        "Error",
        errorMessage,
        "deleteProduct"
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
      const errorMessage =
        error.response.data.message || "Something Went Wrong!";
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

export const fetchSimilarProducts =
  (brandName = "", glassType = "") =>
  async (dispatch) => {
    await fecthData(
      dispatch,
      "similarProducts",
      productSliceAction,
      "setSimilarProducts",
      `/api/v1/products/?limit=6&modelType=${glassType}`
    );
    await fecthData(
      dispatch,
      "similarBrand",
      productSliceAction,
      "setSimilarBrand",
      `/api/v1/products/?limit=6&keyword=${brandName}`
    );
  };
