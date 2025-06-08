import express from "express";
import { updateCart, getCartByUserId, getCartById } from "../services/cart.js";
import { getActiveUserId } from "../globalActiveUser/globalActiveUser.js";
import { requireAuth } from "../middleware/authorization.js";
const router = express.Router();

// GET all carts
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = getActiveUserId();
    const cart = await getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No cart could be found",
    });
  }
});

// Hämta cart med given cartId
router.get("/:cartId", requireAuth, async (req, res) => {
  try {
    const cart = await getCartById(req.params.cartId);
    if (!cart) {
      res.status(400).json({
        success: false,
        message: "No cart was found with provided ID",
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not get the Cart",
    });
  }
});

// PUT
router.put("/", async (req, res) => {
  try {
    const { guestId, prodId, qty } = req.body;
    const activeUserId = getActiveUserId();

    const { cart, isGuest } = await updateCart(
      activeUserId,
      guestId,
      prodId,
      qty
    );

    const response = {
      message: "Cart updated successfully",
      cart,
    };

    if (isGuest) {
      response.guestId = cart.userId;
    }

    res.json(response);
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
