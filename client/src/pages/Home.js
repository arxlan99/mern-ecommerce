import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="content">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Fragment>
          {products.map((product) => (
            <div key={product._id} className="content-product">
              <Card
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                numReviews={product.numReviews}
              />
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Home;
