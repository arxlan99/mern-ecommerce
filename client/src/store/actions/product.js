import axios from "axios";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAIL = "PRODUCT_DETAIL_FAIL";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL";
export const PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET";

export const PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST";
export const PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS";
export const PRODUCT_UPDATE_FAIL = "PRODUCT_UPDATE_FAIL";
export const PRODUCT_UPDATE_RESET = "PRODUCT_UPDATE_RESET";


export const listProducts = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get("/api/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getProductDetail = (id) => {
  console.log(id);

  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.product });
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

export const createProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.post(
        "/api/products",
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};


export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}