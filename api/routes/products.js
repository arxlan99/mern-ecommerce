import express from "express";
import {
  getAllProducts,
  getProduct,
  createSeed,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/product.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/seed", createSeed);

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/", isAuth, createProduct);

router.put('/:id', isAuth, updateProduct);

router.delete("/:id", isAuth, deleteProduct);

export default router;
