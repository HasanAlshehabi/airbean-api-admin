import authRouter from "./routes/auth.js";
import orderRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import adminMenuRouter from "./routes/adminmenu.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/adminmenu", adminMenuRouter);

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
     console.log(`Swagger available at http://localhost:${PORT}/api-docs`);
  });
});
// ErrorHandling
app.use(errorHandler);
