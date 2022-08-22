import { notificationActions } from "../notificationSlice/notificationSlice";
export const dispatchNotification = (
  dispatch,
  type,
  status,
  message,
  action = ""
) => {
  dispatch(
    notificationActions.setNotification({
      type,
      status,
      message,
      action,
    })
  );

  setTimeout(() => {
    dispatch(notificationActions.clearDisplay());
  }, 3000);
};
