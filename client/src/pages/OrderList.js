import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import {
  deleteOrder,
  DELETE_ORDER_RESET,
  listOrders,
} from "../store/actions/order";

const OrderList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = orderDelete;

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteOrder(order._id));
    }
  };

  useEffect(() => {
    dispatch({ type: DELETE_ORDER_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger"> {errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>user</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>Order Paid </th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteHandler(order);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
