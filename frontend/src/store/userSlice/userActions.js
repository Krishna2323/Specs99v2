import { userSliceActions } from "./userSlice";
import useNotification from "../../components/hooks/useNotification";
import {
  notificationActions,
  clearNotication,
} from "../notificationSlice/notificationSlice";
import axios from "axios";
import { getCart } from "../cartSlice/cartActions";
import { dispatchNotification } from "../helper/helper";

export const login = (data) => {
  return async (dispatch) => {
    const fetchUser = async () => {
      dispatch(
        notificationActions.setNotification({
          type: "loading",
          status: "Loading",
          message: "Loging In",
          action: "login",
        })
      );
      const response = await axios.post("/api/v1/users/login", data);

      const { data: userData } = response.data;

      dispatch(getCart());

      dispatch(
        userSliceActions.loginUser({
          userData: userData.user,
          isLoggedIn: true,
        })
      );
      dispatch(
        notificationActions.setNotification({
          type: "success",
          status: "Success",
          message: `Welcome Back ${userData.user.name.split(" ")[0]}`,
          action: "login",
        })
      );
    };

    try {
      await fetchUser();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message || "Something Went Wrong";
      dispatch(
        notificationActions.setNotification({
          type: "error",
          status: "Error",
          message: errorMessage,
          action: "login",
        })
      );
    }

    setTimeout(() => {
      dispatch(clearNotication());
    }, 3000);
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    const singupPost = async () => {
      dispatch(
        notificationActions.setNotification({
          type: "loading",
          status: "Loading",
          message: "Signing In",
        })
      );
      const response = await axios.post("/api/v1/users/singup", data);

      const { data: userData } = response.data;
      await axios.post("/api/v1/cart", {
        user: userData.user._id,
        products: [],
      });

      dispatch(
        userSliceActions.signupUser({
          userData: userData.user,
          isLoggedIn: true,
        })
      );
      dispatch(
        notificationActions.setNotification({
          type: "success",
          status: "Success",
          message: `Welcome ${userData.user.name}`,
        })
      );
    };

    try {
      await singupPost();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message || "Something Went Wrong";
      dispatch(
        notificationActions.setNotification({
          type: "error",
          status: "Error",
          message: errorMessage,
        })
      );
    }
    dispatch(clearNotication());
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    const singupPost = async () => {
      console.log("loading");
      const response = await axios.get("/api/v1/users/loadUser");

      const { user } = response.data;

      dispatch(
        userSliceActions.loginUser({
          userData: user,
          isLoggedIn: true,
        })
      );

      dispatch(getCart());
    };

    singupPost();
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatchNotification(
        dispatch,
        "loading",
        "Updating",
        "Request Sent",
        "updateUser"
      );

      // dispatch(
      //   userSliceActions.updateDetail({
      //     isLoading: true,
      //   })
      // );

      const res = await axios.post("/api/v1/users/updateMe", data);

      console.log(res);

      const { user } = res.data.data;

      dispatch(
        userSliceActions.updateDetail({
          user,
          isLoading: false,
        })
      );

      dispatchNotification(
        dispatch,
        "success",
        "Success",
        "Account Updated",
        "updateUser"
      );
    };

    try {
      await sendRequest();
      dispatch(clearNotication());
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Something Went Wrong!";
      dispatchNotification(
        dispatch,
        "error",
        "Error",
        errorMessage,
        "updateUser"
      );
      dispatch(clearNotication());
    }
    dispatch(clearNotication());
  };
};
