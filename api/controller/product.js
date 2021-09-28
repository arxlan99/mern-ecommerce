import Product from "../models/product.js";

export const createSeed = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.status(201).json({ message: "Seeded products", createdProducts });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({ products });
  } catch (error) {
    if (error) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json({ product });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ msg: "Product not found!!" });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
