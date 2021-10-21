import express from "express";
import {
  createSeed,
  getUser,
  putProfileInfo,
  getUsers,
  deleteUser,
  editUser,
} from "../controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/seed", createSeed);

router.get("/:id", getUser);

router.put("/profile", isAuth, putProfileInfo);

router.get("/", isAuth, getUsers);

router.delete("/:id", isAuth, deleteUser);

router.put("/:id", isAuth, editUser);

export default router;
