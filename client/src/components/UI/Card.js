import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Card = (props) => {
  const { product } = props;
  const productPath = "/product/" + product._id;

  return (
    <div className="card">
      <Link to={productPath}>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        ></div>
      </Link>
      <div className="card-content">
        <Link to={productPath}>
          <div className="content-title">{product.name}</div>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="content-desc">${product.price}</div>
      </div>
    </div>
  );
};

export default Card;
