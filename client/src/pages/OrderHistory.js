import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import { listOrdersMine } from "../store/actions/order";
import "./OrderHistory.css";

import { useHistory } from "react-router-dom";

const OrderHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;

  useEffect(() => {
    dispatch(listOrdersMine());
  }, [dispatch]);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
