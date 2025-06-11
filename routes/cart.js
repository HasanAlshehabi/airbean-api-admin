import express from 'express';
import { updateCart, getCartByUserId, getCartById } from "../services/cart.js";
import { verifyToken } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const cart = await getCartByUserId(userId);
  res.json(cart);
});

router.get('/:cartId', verifyToken, async (req, res) => {
  const cart = await getCartById(req.params.cartId);
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  res.json(cart);
});

router.put('/', verifyToken, async (req, res) => {
  try {
    const { guestId, prodId, qty } = req.body;
    const activeUserId = req.user.userId;
    const { cart, isGuest } = await updateCart(activeUserId, guestId, prodId, qty);

    const response = {
      message: 'Cart updated successfully',
      cart
    };
    if (isGuest) {
      response.guestId = cart.userId;
    }

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
