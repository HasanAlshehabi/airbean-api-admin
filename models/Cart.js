import mongoose from "mongoose";
import { getActiveUser } from "../globalActiveUser/globalActiveUser.js";
import { v4 as uuidv4 } from "uuid";

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        prodId: { type: String, required: true },
        title: String,
        price: Number,
        qty: Number,
      },
    ],

    userId: {
      default: () => getActiveUser(),
      type: String,
      required: true,
    },
    cartId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4().replace(/-/g, "").slice(0, 10),
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
