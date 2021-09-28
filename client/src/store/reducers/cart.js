import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).data
    : [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === existingItem.productId ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.productId !== action.payload
        ),
      };
    default:
      return state;
  }
};
