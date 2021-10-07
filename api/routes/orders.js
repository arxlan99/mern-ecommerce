import express from "express";
import { postOrder } from "../controller/order.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/", isAuth, postOrder);

export default router;
