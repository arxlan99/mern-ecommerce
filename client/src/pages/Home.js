import React from "react";
import Card from "../components/UI/Card";
import data from "../data/data";
import "./Home.css";

const Home = () => {
  return (
    <div className="content">
      {data.products.map((product) => (
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
    </div>
  );
};

export default Home;
