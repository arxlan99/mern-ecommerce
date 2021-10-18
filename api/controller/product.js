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

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: "sample name " + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res
      .status(201)
      .json({ message: "Created product", product: createdProduct });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.image = req.body.image;
      product.price = req.body.price;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res
        .status(201)
        .json({ message: "Updated product", product: updatedProduct });
    } else {
      const error = new Error("Product not found!!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
