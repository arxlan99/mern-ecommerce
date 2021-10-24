import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";

export const SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS";
export const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";

export const EMPTY_CART = "EMPTY_CART";

export const addToCart = (productId, qty) => {
  return async (dispatch, getState) => {
   
    const { data } = await axios.get(`/api/products/${productId}`);
    const product = data.product;
    dispatch({
      type: ADD_TO_CART,
      payload: {
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.countInStock,
        productId: product._id,
        seller: product.seller,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
    localStorage.removeItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: data,
    });
  };
};
