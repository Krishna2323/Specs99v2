import { userSliceActions } from "./userSlice";
import useNotification from "../../components/hooks/useNotification";
import {
  notificationActions,
  clearNotication,
} from "../notificationSlice/notificationSlice";
import axios from "axios";

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
      console.log(userData);

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
    setTimeout(() => {
      dispatch(clearNotication());
    }, 3000);
  };
};
