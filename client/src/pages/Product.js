import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Rating from "../components/UI/Rating";
import "./Product.css";
import { Fragment } from "react";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import { getProductDetail } from "../store/actions/product";
import { addToCart } from "../store/actions/cart";

const Product = (props) => {
  const { id } = useParams();
  // const history = useHistory();

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    // history.push(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty));
  };

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
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </span>
              </div>
              <div className="pcontent-items">
                {product.countInStock > 0 && (
                  <Fragment>
                    <span>Quantity</span>
                    <span>
                      <select
                        className="pcontent-items-select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </span>
                  </Fragment>
                )}
              </div>
              <button onClick={addToCartHandler} className="pcontent-button">
                Add to Cart
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Product;
