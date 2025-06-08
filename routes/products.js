import { Router } from "express";
import Product from "../models/product.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No products could be found",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ prodId: req.params.id });
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No product was found with that ID",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not fetch products",
    });
  }
});

export default router;
