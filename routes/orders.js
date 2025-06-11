import express from 'express';
import { createOrder, getOrdersByUserId, getAllOrders } from '../services/order.js';
import { verifyToken } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const orders = await getAllOrders();
  res.json(orders);
});

router.get('/:userId', verifyToken, async (req, res) => {
  const orders = await getOrdersByUserId(req.params.userId);
  res.json(orders);
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { cartId } = req.body;
    const order = await createOrder(cartId);
    res.status(201).json({ message: 'Order placed', total: order.total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
