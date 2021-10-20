import React, { Fragment, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cart";
import "./Cart.css";
import MessageBox from "../components/Feedback/MessageBox";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  const changeQtyHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      {cartItems?.length === 0 ? (
        <MessageBox>Cart is empty.</MessageBox>
      ) : (
        <Fragment>
          <div className="cart-left">
            <h1>Shopping Cart</h1>
            <ul className="cart-left-content">
              {cartItems?.map((item) => (
                <li className="cart-products-list">
                  <img src={item.image} alt="" width="75" height="75" />
                  <span>
                    <Link to={`/product/${item.productId}/`}></Link>
                    {item.name}
                  </span>
                  <select
                    className="cart-select-input"
                    value={item.qty}
                    onChange={(e) =>
                      changeQtyHandler(item.productId, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div>${item.price}</div>
                  <div>
                    <button
                      className="cart-delete-btn"
                      type="button"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-right">
            <h1>Cart Summary</h1>
            <ul>
              <li>
                <h2>
                  Subtotal (
                  {cartItems.reduce((prev, state) => prev + state.qty, 0)}{" "}
                  items) : $
                  {cartItems.reduce(
                    (prev, state) => prev + state.price * state.qty,
                    0
                  )}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="cart-right-checkout"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
