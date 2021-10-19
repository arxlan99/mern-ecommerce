import React, { useEffect } from "react";
import "./PlaceOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import { detailsOrder } from "../store/actions/order";

const Order = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const orderId = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  let { loading, error, order } = orderDetails;
  console.log(order);
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="placeorder">
      <div className="content">
        <h1>Order {order._id}</h1>

        <div className="left">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.shippingAddress.fullname}
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p></p>
          </div>
          <div>
            <h2>Payment</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
          </div>
          <div className="orderItems">
            <h2>Order Items</h2>
            <ul>
              {order.orderItems.map((item) => (
                <li className="cart-products-list">
                  <img src={item.image} alt="" width="75" height="75" />
                  <span>
                    <Link to={`/product/${item.productId}/`}></Link>
                    {item.name}
                  </span>

                  <div>
                    {item.qty} X ${item.price} = ${item.qty * item.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div>
            <h2>Order Summary</h2>
            <div className="row">
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </div>
            <div className="row">
              <div>Shipping</div>
              <div>${order.shippingPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>Tax</div>
              <div>${order.taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>
                <strong> Order Total</strong>
              </div>
              <div>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
