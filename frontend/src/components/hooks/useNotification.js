import { useDispatch } from "react-redux";
import {
  notificationActions,
  clearNotication as actionClearNotification,
} from "../../store/notificationSlice/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();

  const clearNotification = () => {
    dispatch(actionClearNotification());
  };

  const notify = (type = "", status = "", message = "", action = "") => {
    dispatch(
      notificationActions.setNotification({ type, status, message, action })
    );

    clearNotification();
  };

  return { notify, clearNotification };
};

export default useNotification;
