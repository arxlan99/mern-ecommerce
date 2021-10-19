import axios from "axios";
import { EMPTY_CART } from "./cart";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const CREATE_ORDER_RESET = "CREATE_ORDER_RESET";

export const DETAILS_ORDER_REQUEST = "DETAILS_ORDER_REQUEST";
export const DETAILS_ORDER_SUCCESS = "DETAILS_ORDER_SUCCESS";
export const DETAILS_ORDER_FAILURE = "DETAILS_ORDER_FAILURE";

export const LIST_ORDER_MINE_REQUEST = "LIST_ORDER_MINE_REQUEST";
export const LIST_ORDER_MINE_SUCCESS = "LIST_ORDER_MINE_SUCCESS";
export const LIST_ORDER_MINE_FAILURE = "LIST_ORDER_MINE_FAILURE";

export const LIST_ORDER_REQUEST = "LIST_ORDER_REQUEST";
export const LIST_ORDER_SUCCESS = "LIST_ORDER_SUCCESS";
export const LIST_ORDER_FAILURE = "LIST_ORDER_FAILURE";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const response = await axios.post(`api/orders`, order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data.order });
      dispatch({ type: EMPTY_CART });
      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const detailsOrder = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({ type: DETAILS_ORDER_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(response.data.order);
      dispatch({ type: DETAILS_ORDER_SUCCESS, payload: response.data.order });
    } catch (error) {
      dispatch({
        type: DETAILS_ORDER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listOrdersMine = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_ORDER_MINE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const response = await axios.get(`api/orders/mine`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(response.data.orders);
      dispatch({
        type: LIST_ORDER_MINE_SUCCESS,
        payload: response.data.orders,
      });
    } catch (error) {
      dispatch({
        type: LIST_ORDER_MINE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listOrders = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_ORDER_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const response = await axios.get(`api/orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(response.data.orders);
      dispatch({
        type: LIST_ORDER_SUCCESS,
        payload: response.data.orders,
      });
    } catch (error) {
      dispatch({
        type: LIST_ORDER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
