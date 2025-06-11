import express from "express";
import Product from "../models/product.js";
import { requireAdmin, verifyToken } from "../middleware/adminAuth.js";

const router = express.Router();

// Lägg till ny produkt
router.post("/add", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, desc, price } = req.body;

    if (!title || !desc || !price) {
      return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    const prodId = `prod-${Math.random().toString(36).substring(2, 8)}`;
    const createdAt = new Date();

    const newProduct = await Product.create({ title, desc, price, prodId, createdAt });
    res.status(201).json({ message: "Produkt skapad", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Uppdatera produkt
router.put("/update/:prodId", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { prodId } = req.params;
    const updateData = { ...req.body, modifiedAt: new Date() };

    const updatedProduct = await Product.findOneAndUpdate({ prodId }, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Produkt hittades inte" });
    }

    res.json({ message: "Produkt uppdaterad", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ta bort produkt
router.delete("/delete/:prodId", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { prodId } = req.params;
    const deleted = await Product.findOneAndDelete({ prodId });

    if (!deleted) {
      return res.status(404).json({ error: "Produkt hittades inte" });
    }

    res.json({ message: "Produkten har tagits bort" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
