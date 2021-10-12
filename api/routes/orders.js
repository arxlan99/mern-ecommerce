import express from "express";
import { postOrder, getOrder, getMineOrder } from "../controller/order.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/", isAuth, postOrder);

router.get("/mine", isAuth, getMineOrder);

router.get("/:id", isAuth, getOrder);

export default router;
