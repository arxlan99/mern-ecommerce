import axios from "axios";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAIL = "PRODUCT_DETAIL_FAIL";

export const listProducts = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get("/api/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
