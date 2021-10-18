import axios from "axios";

export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAILURE = "USER_SIGNIN_FAILURE";
export const USER_SIGNOUT = "USER_SIGNOUT";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE";

export const USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST";
export const USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS";
export const USER_UPDATE_PROFILE_FAILURE = "USER_UPDATE_PROFILE_FAILURE";
export const USER_UPDATE_PROFILE_RESET = "USER_UPDATE_PROFILE_RESET";

export const signin = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const data = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      console.log(data);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    dispatch({ type: USER_SIGNOUT });
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const data = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const detailsUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.put(`/api/users/profile`, user, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data.user });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
