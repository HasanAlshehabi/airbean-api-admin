import Cart from "../models/Cart.js";
import { Order } from "../models/Order.js";

export async function getAllOrders() {
  return await Order.find();
}

export async function getOrdersByUserId(userId) {
  return await Order.find({ userId });
}

export async function createOrder(cartId) {
  const cart = await Cart.findOne({ cartId });
  if (!cart) throw new Error("Invalid cart ID");

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const order = await Order.create({
    userId: cart.userId,
    items: cart.items,
    total,
  });

  await Cart.findOneAndDelete({ cartId });
  return order;
}
