import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Rating from "../components/UI/Rating";
import "./Product.css";
import { Fragment } from "react";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import { getProductDetail } from "../store/actions/product";

const Product = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <div className="product">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Fragment>
          <Link to="/">
            <div className="product-back">Back to home page</div>
          </Link>
          <div className="product-content">
            <div className="pcontent-left">
              <img
                className="pcontent-bimage"
                src={product.image}
                alt="shop_image"
              />
            </div>
            <div className="pcontent-center">
              <h4 className="pcontent-center-items">{product.name}</h4>
              <div className="pcontent-center-items">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
              <div className="pcontent-center-items">
                Price: {product.price}
              </div>
              <div className="pcontent-center-items">
                Description: {product.description}
              </div>
              <div className="pcontent-center-items">Images:</div>
              <img
                className="small-pimage pcontent-center-items"
                src={product.image}
                alt="product_image"
              />
            </div>
            <div className="pcontent-right">
              <div className="pcontent-items">
                <span>Price</span>
                <span>{product.price}</span>
              </div>
              <div className="pcontent-items">
                <span>Status</span>
                <span>In Stock</span>
              </div>
              <button className="pcontent-button">Add to Cart</button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Product;
