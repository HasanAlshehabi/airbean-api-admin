import authRouter from "./routes/auth.js";
import orderRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
// ErrorHandling
app.use(errorHandler);
