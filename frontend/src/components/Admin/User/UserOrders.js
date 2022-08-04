import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../DashBoard/SideBar/Sidebar";
import SidebarProduct from "../DashBoard/SideBar/SidebarProduct/SidebarSubLinks";
import Loading from "../../UI/Loading/Loading";
import "./UserOrders.scss";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "./OrderRow/OrderRow";
import { getOrders } from "../../../store/orderSlice/orderActions";
import Navigation from "../Navigation/Navigation";
const UserOrders = () => {
  const [sidebar, setSidebar] = useState(false);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="user-orders-page">
        <Navigation onClick={toggleSidebar} />
        <Sidebar open={sidebar} />
        <div className="user-orders">
          <h1 className="user-orders__heading heading-1 heading-1--white">
            Your Order History
          </h1>
          {isError && <Loading heading={message} />}
          {isLoading && <Loading heading="Loading..." type="loading" />}

          {orders && orders.map((e) => <OrderRow key={e._id} order={e} />)}
        </div>
      </div>
    </Fragment>
  );
};

export default UserOrders;
