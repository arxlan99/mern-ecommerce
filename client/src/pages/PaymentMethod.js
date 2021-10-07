import React, { useState } from "react";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import "./PaymentMethod.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../store/actions/cart";

const PaymentMethod = () => {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="payment">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <div>
            <h1>Payment</h1>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                value="Paypal"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                id="stripe"
                value="Stripe"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="stripe">Stripe</label>
            </div>
          </div>
          <div>
            <button className="" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
