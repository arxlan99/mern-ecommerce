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

function App() {
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
          <Route path="/product/:id">
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
