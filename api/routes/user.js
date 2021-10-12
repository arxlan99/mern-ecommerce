import express from "express";
import { createSeed, getUser, putProfileInfo } from "../controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/seed", createSeed);

router.get("/:id", getUser);

router.put("/profile", isAuth, putProfileInfo);

export default router;
