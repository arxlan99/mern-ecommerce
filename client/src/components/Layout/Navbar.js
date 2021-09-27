import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-left">XalMarket</div>
      </Link>

      <div className="navbar-right">
        <div>
          <Link to="/cart">
            <div className="navbar-badge-container">
              <span>Cart</span>
              {cartItems.length > 0 && (
                <div className="navbar-badge">
                  <span>{cartItems.length}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
        <div>
          <Link to="/signin">
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
