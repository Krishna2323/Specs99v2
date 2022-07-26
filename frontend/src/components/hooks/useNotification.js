import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notificationSlice/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  return (type = "", status = "", message = "", action = "") => {
    dispatch(
      notificationActions.setNotification({ type, status, message, action })
    );
  };
};

export default useNotification;
