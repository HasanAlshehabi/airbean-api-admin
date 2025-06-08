import express from "express";
import { allowGuestOrUser, requireAuth } from "../middleware/authorization.js";
import {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
} from "../services/order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

router.get("/:userId", requireAuth, async (req, res) => {
  const orders = await getOrdersByUserId(req.params.userId);
  res.json(orders);
});

router.post("/", allowGuestOrUser, async (req, res) => {
  try {
    const { cartId } = req.body;
    const order = await createOrder(cartId);
    res.status(201).json({ message: "Order placed", total: order.total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
