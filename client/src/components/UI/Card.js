import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Card = (props) => {
  const productPath = "/product/" + props.id;

  return (
    <div className="card">
      <Link to={productPath}>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        ></div>
      </Link>
      <div className="card-content">
        <div className="content-title">{props.name}</div>
        <Rating rating={props.rating} numReviews={props.numReviews} />
        <div className="content-desc">${props.price}</div>
      </div>
    </div>
  );
};

export default Card;
