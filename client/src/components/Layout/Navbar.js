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
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderHistory">Order History</Link>
                </li>
                <li>
                  <Link to="/#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">
              <span>Sign in </span>
            </Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className="navbar-dropdown">
              <Link to="/admin">
                Seller <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="navbar-dropdown-content">
                <li>
                  <Link to="/productList/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderList/seller">Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="navbar-dropdown">
              <Link to="/admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="navbar-dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productList">Products</Link>
                </li>
                <li>
                  <Link to="/orderList">Orders</Link>
                </li>
                <li>
                  <Link to="/userList">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
