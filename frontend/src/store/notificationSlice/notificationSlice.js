import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  status: null,
  message: "",
  type: "",
  display: false,
  action: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.display = true;
      state.action = action.payload.action;
    },
    _clearNotication(state) {
      state.status = "";
      state.message = "";
      state.type = "";
      state.action = "";
    },
    clearDisplay(state) {
      state.display = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const clearNotication = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(notificationActions._clearNotication());
      dispatch(notificationActions.clearDisplay());
    }, 3000);
  };
};

export default notificationSlice.reducer;
