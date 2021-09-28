import express from "express";
import {
  getAllProducts,
  getProduct,
  createSeed,
} from "../controller/product.js";

const router = express.Router();

router.get("/seed", createSeed);

router.get("/", getAllProducts);

router.get("/:id", getProduct);

export default router;
