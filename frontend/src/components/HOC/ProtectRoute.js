import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import useNotification from "../hooks/useNotification";

const ProtectRoute = (Component, props) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { notify } = useNotification();
  const { pathname } = useLocation();
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    console.log(pathname);
    if (pathname !== "/") {
      notify("loading", "🧐", "Login To Access Route");
    }
  }, []);
  return (
    <Fragment>
      {isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </Fragment>
  );
};

export default ProtectRoute;
