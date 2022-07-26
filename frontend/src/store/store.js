import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice/notificationSlice";
import userReducer from "./userSlice/userSlice";
import productsReducer from "./productsSlice/productsSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export default store;
