import React, { Fragment, useEffect } from "react";
import Sidebar from "../DashBoard/SideBar/Sidebar";
import SidebarProduct from "../DashBoard/SideBar/SidebarProduct/SidebarSubLinks";
import Loading from "../../UI/Loading/Loading";
import "./UserOrders.scss";
import { useDispatch, useSelector } from "react-redux";
import OrderRow from "./OrderRow/OrderRow";
import { getOrders } from "../../../store/orderSlice/orderActions";
const UserOrders = () => {
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="user-orders-page">
        <Sidebar isOpen={false} />
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
