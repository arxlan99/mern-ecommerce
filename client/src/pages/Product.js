import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Rating from "../components/UI/Rating";
import data from "../data/data";
import "./Product.css";

const Product = (props) => {
  const { id } = useParams();
  const product = data.products.find((x) => x._id === id);
  if (!product) {
    return <div className="notFound">Product Not Found ....</div>;
  }
  return (
    <div className="product">
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
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div className="pcontent-center-items">Price: {product.price}</div>
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
    </div>
  );
};

export default Product;
