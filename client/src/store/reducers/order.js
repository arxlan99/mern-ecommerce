import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  DETAILS_ORDER_FAILURE,
  DETAILS_ORDER_REQUEST,
  DETAILS_ORDER_SUCCESS,
  LIST_ORDER_FAILURE,
  LIST_ORDER_MINE_FAILURE,
  LIST_ORDER_MINE_REQUEST,
  LIST_ORDER_MINE_SUCCESS,
  LIST_ORDER_REQUEST,
  LIST_ORDER_SUCCESS,
} from "../actions/order";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAILURE:
      return { loading: false, error: action.error };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {}, error: "" },
  action
) => {
  switch (action.type) {
    case DETAILS_ORDER_REQUEST:
      return { loading: true };
    case DETAILS_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case DETAILS_ORDER_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const orderMineListReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case LIST_ORDER_MINE_REQUEST:
      return { loading: true };
    case LIST_ORDER_MINE_SUCCESS:
      return { loading: false, orders: action.payload };
    case LIST_ORDER_MINE_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const orderListReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case LIST_ORDER_REQUEST:
      return { loading: true };
    case LIST_ORDER_SUCCESS:
      return { loading: false, orders: action.payload };
    case LIST_ORDER_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};