import "./App.css";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import NotFound from "./pages/404";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import ShippingAddress from "./pages/ShippingAddress";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";

import { useSelector } from "react-redux";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";

function App() {
  let auth = useSelector((state) => state.userSignin?.userInfo?.isAdmin);
  let seller = useSelector((state) => state.userSignin?.userInfo?.isSeller);
  return (
    <Router forceRefresh={true}>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/product/:id" exact>
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/cart/:id">
            <Cart />
          </Route>
          <Route path="/payment">
            <PaymentMethod />
          </Route>
          <Route path="/shipping">
            <ShippingAddress />
          </Route>
          <Route path="/placeorder">
            <PlaceOrder />
          </Route>
          <Route path="/order/:id">
            <Order />
          </Route>
          <Route path="/orderHistory">
            <OrderHistory />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          {auth && (
            <Route path="/productList" exact>
              <ProductList />
            </Route>
          )}
          {auth && (
            <Route path="/product/:id/edit" exact>
              <ProductEdit />
            </Route>
          )}
          {auth && (
            <Route path="/orderList" exact>
              <OrderList />
            </Route>
          )}
          {auth && (
            <Route path="/userList">
              <UserList />
            </Route>
          )}
          {auth && (
            <Route path="/user/:id/edit">
              <UserEdit />
            </Route>
          )}
          {seller && (
            <Route path="/productList/seller">
              <ProductList />
            </Route>
          )}
          {seller && (
            <Route path="/orderList/seller">
              <OrderList />
            </Route>
          )}
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
