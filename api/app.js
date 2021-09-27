import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productsRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", productsRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data || null;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.qy55l.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
