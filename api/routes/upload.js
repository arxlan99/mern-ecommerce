import express from "express";
import multer from "multer";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpg`);
  },
});

export const upload = multer({ storage });

router.post("/", isAuth, upload.single("image"), (req, res, next) => {
  let fileUrl = req.file.path.replace(/\\/g, "/");

  res.json(`${fileUrl}`);
});

export default router;
