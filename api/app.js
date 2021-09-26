import express from "express";

import productsRoutes from "./routes/products.js";

const app = express();

app.use("/api", productsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
