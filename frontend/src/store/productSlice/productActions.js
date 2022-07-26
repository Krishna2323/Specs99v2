import axios from "axios";
import { notificationActions } from "../notificationSlice/notificationSlice";

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
