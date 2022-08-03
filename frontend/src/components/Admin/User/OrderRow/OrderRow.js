import React, { Fragment } from "react";
import "./OrderRow.scss";

const OrderRow = (props) => {
  const { order } = props;
  return (
    <Fragment>
      {order &&
        order.products.map((product) => (
          <div className="order-row">
            <img
              src={require(`../../../assests/products/${product.product.imageCover}`)}
              className="order-row__image"
              alt=""
            />

            <div className="order-row__info__div order-row__info__div-2">
              <span className="order-info__price">Price: {product.price}</span>
              <span className="order-info__mrp">
                Mrp: {product.product.mrp}
              </span>
              <span className="order-info__quantity">
                Quantity: {product.quantity}
              </span>
              <span className="order-info__total-price">
                Total Price: {order.totalPrice}
              </span>
              <button className="btn-small btn-small--primary">
                Add Review
              </button>
            </div>

            <div className="order-row__info__div order-row__info__div-1">
              <span className="order-info__id">Order Id: {order._id} </span>
              <span className="order-info__payment-method">
                Payment Method: {order.paymentMethod.toUpperCase()}
              </span>
              <span className="order-info__payment-status">
                Payment Status: {order.paymentStatus}
              </span>
              <span className="order-info__deliver-status">
                Delivery Status: {order.deliveryStatus}
              </span>
              <span className="order-info__ordered-on">
                Order On: {new Date(order.orderedAt).getFullYear()}
              </span>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default OrderRow;
