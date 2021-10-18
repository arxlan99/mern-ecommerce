import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import productsRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import ordersRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors(), (req, res, next) => {
  next();
});

app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data || null;
  res.status(status).send({ message: message, data: data });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.qy55l.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
