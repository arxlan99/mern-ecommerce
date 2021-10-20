import express from "express";
import {
  postOrder,
  getOrder,
  getMineOrder,
  getOrders,
  deleteOrder,
  deliverOrder,
} from "../controller/order.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/", isAuth, getOrders);

router.post("/", isAuth, postOrder);

router.get("/mine", isAuth, getMineOrder);

router.get("/:id", isAuth, getOrder);

router.delete("/:id", isAuth, deleteOrder);

router.put("/:id/deliver", isAuth, deliverOrder);

export default router;
