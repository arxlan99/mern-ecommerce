import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import { saveShippingAddress } from "../store/actions/cart";
import "./ShippingAddress.css";

const ShippingAdress = () => {
  const history = useHistory();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    history.push("/signin");
  }

  const [fullname, setFullname] = useState(shippingAddress.fullname);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullname, address, city, postalCode, country })
    );
    history.push("/payment");
  };

  return (
    <div className="shipping">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <label htmlFor="fullname">Full Name: </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="postalCode">PostalCode: </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <label></label>
            <button type="submit">Continue</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShippingAdress;
