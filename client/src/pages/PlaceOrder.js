import React from "react";
import "./PlaceOrder.css";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {};
  return (
    <div className="placeorder">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="content">
        <div className="left">
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {cart.shippingAddress.fullname}
            </p>
            <p>
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
            <p></p>
          </div>
          <div>
            <h2>Payment</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>
          <div className="orderItems">
            <h2>Order Items</h2>
            <ul>
              {cart.cartItems.map((item) => (
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
              <div>${cart.itemsPrice}</div>
            </div>
            <div className="row">
              <div>Shipping</div>
              <div>${cart.shippingPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>Tax</div>
              <div>${cart.taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div>
                <strong> Order Total</strong>
              </div>
              <div>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <div className="button-container">
              <button
                type="button"
                onClick={placeOrderHandler}
                className="primary block"
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
