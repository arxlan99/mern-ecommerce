import React, { useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/actions/user";

const Navbar = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

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
          {userInfo ? (
            <div className="navbar-dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="navbar-dropdown-content">
                <Link to="#signout" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <span>Sign in </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
