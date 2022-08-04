import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./DashBoard.scss";
import Sidebar from "./SideBar/Sidebar";
import CartProductRow from "../../UI/Cart/CartProductRow/CartProductRow";
import Navigation from "../Navigation/Navigation";

const DashBoard = () => {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <div className="dashboard-component">
      <Navigation onClick={toggleSidebar} />
      <Sidebar open={sidebar} />
    </div>
  );
};

export default DashBoard;
