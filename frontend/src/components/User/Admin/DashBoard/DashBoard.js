import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./DashBoard.scss";
import Sidebar from "../../User/UserUi/SideBar/Sidebar";
import CartProductRow from "../../../UI/Cart/CartProductRow/CartProductRow";
import Navigation from "../../User/UserUi/Navigation/Navigation";
import DashboardCard from "../AdminUi/DashboardCard/DashboardCard";
import Loading from "../../../UI/Loading/Loading";

const DashBoard = () => {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <div className="dashboard-component">
      <Navigation onClick={toggleSidebar} />
      <Sidebar open={sidebar} />

      <div className="dashboard-component-container">
        <div className="dashboard-component-container__cards">
          <DashboardCard heading="Products" />
          <DashboardCard heading="Users" />
          <DashboardCard heading="Orders" />
          <DashboardCard heading="Reviews" />
        </div>
        <Loading heading="This Page Is Not Completed Yet." dark={true} />
      </div>
    </div>
  );
};

export default DashBoard;
