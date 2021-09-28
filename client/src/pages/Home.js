import React, { useCallback, useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import Card from "../components/UI/Card";
import { listProducts } from "../store/actions/product";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dummyProducts = [
    {
      _id: "6152ea8e930ff11145c7befa",
      name: "Nike Slim Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/9617882/pexels-photo-9617882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      _id: "6152ea8e930ff11145c7befb",
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      _id: "6152ea8e930ff11145c7befc",
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/9623645/pexels-photo-9623645.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 220,
      countInStock: 10,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "high quality product",
    },
    {
      _id: "6152ea8e930ff11145c7befd",
      name: "Nike Slim Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/9604182/pexels-photo-9604182.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 78,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      _id: "6152ea8e930ff11145c7befe",
      name: "Puma Slim Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/5303044/pexels-photo-5303044.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      _id: "6152ea8e930ff11145c7beff",
      name: "Adidas Fit Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/3856257/pexels-photo-3856257.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description: "high quality product",
    },
  ];

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div className="content">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Fragment>
          {dummyProducts.length === 0 && (
            <MessageBox>No Product Found</MessageBox>
          )}
          {dummyProducts.length > 0 &&
            dummyProducts.map((product) => (
              <div className="content-product">
                <Card key={product._id} product={product}></Card>
              </div>
            ))}
        </Fragment>
      )}
    </div>
  );
};

export default Home;

/*{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="content-product">
            {products.map((product) => (
              <Card key={product._id} product={product}></Card>
            ))}
          </div>*/

/* <Fragment>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          {products.length > 0 &&
            products.map((product) => (
              <div className="content-product">
                <Card key={product._id} product={product}></Card>
              </div>
            ))}
        </Fragment> */
