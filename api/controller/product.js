import data from "../data/data.js";

export const getProduct = (req, res) => {
  console.log("----------", req.params.id);

  const product = data.products.find(
    (p) => parseInt(p._id) === parseInt(req.params.id)
  );

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found!!" });
  }
};

export const getAllProducts = (req, res) => {
  console.log("----------");
  res.send(data.products);
};
