import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-left">XalMarket</div>
      </Link>

      <div className="navbar-right">
        <a href="/cart">
          <span>Cart</span>
        </a>
        <a href="/signin">
          <span>Sign in</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
