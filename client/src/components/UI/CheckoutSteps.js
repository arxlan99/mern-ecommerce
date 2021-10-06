import React from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = (props) => {
  return (
    <div className="checkout">
      <div className={props.steps1 ? "active" : ""}>Sign in</div>
      <div className={props.steps2 ? "active" : ""}>Shipping</div>
      <div className={props.steps3 ? "active" : ""}>Payment</div>
      <div className={props.steps4 ? "active" : ""}>Placeholder</div>
    </div>
  );
};

export default CheckoutSteps;
