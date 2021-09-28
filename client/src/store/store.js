import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cart";
import { productDetailReducer, productListReducer } from "./reducers/product";
import { userSigninReducer } from "./reducers/user";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
