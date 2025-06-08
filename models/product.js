import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prodId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  desc: {
    type: String,
    maxlength: 200,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
