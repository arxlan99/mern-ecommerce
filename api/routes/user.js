import express from "express";
import { createSeed } from "../controller/user.js";

const router = express.Router();

router.get("/seed", createSeed);

export default router;
