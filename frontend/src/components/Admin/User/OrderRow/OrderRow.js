import React, { Fragment } from "react";
import "./OrderRow.scss";
import useNotification from "../../../hooks/useNotification";

const OrderRow = (props) => {
  const { order } = props;
  const { notify } = useNotification();
  const handleOnReviewClick = () => {
    notify("loading", "Action", "Not Yet Impemented", "review");
  };
  return (
    <Fragment>
      {order &&
        order.products.map((product) => (
          <div className="order-row">
            <img
              src={product.product.imageCover}
              className="order-row__image"
              alt=""
            />

            <div className="order-row__info__div order-row__info__div-2">
              <span className="order-row__info__price">
                Price: {product.price}
              </span>
              <span className="order-row__info__mrp">
                Mrp: {product.product.mrp}
              </span>
              <span className="order-row__info__quantity">
                Quantity: {product.quantity}
              </span>
              <span className="order-row__info__total-price">
                Total Price: {product.quantity * product.price}
              </span>
              <button
                className="btn-small btn-small--primary"
                onClick={handleOnReviewClick}
              >
                Add Review
              </button>
            </div>

            <div className="order-row__info__div order-row__info__div-1">
              <span className="order-row__info__id">
                Order Id: {order._id}{" "}
              </span>
              <span className="order-row__info__payment-method">
                Payment Method: {order.paymentMethod.toUpperCase()}
              </span>
              <span className="order-row__info__payment-status">
                Payment Status: {order.paymentStatus.toUpperCase()}
              </span>
              <span className="order-row__info__deliver-status">
                Delivery Status: {order.deliveryStatus.toUpperCase()}
              </span>
              <span className="order-row__info__ordered-on">
                Order On:{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(order.orderedAt))}
              </span>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default OrderRow;
