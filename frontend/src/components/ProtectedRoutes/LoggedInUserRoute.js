import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const LoggedInUserRoute = ({ Component }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Route
      path=""
      element={isLoggedIn ? <Component /> : <Navigate to="/" />}
    ></Route>
  );
};

export default LoggedInUserRoute;
