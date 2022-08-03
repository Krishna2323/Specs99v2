import React from "react";
import { useSelector } from "react-redux";
import "./DashBoard.scss";
import Sidebar from "./SideBar/Sidebar";
import CartProductRow from "../../UI/Cart/CartProductRow/CartProductRow";

const DashBoard = () => {
  return (
    <div className="dashboard-component">
      <Sidebar />
    </div>
  );
};

export default DashBoard;
