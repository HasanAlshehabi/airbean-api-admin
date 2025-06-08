import Product from "../models/product";

export async function validateProduct(req, res, next) {
  const { prodId } = req.body;
  if (!prodId) return res.status(400).json({ error: "Missing prodId" });

  const product = await Product.findOne({ prodId });
  if (!product) return res.status(400).json({ error: "Invalid prodId" });

  next();
}
