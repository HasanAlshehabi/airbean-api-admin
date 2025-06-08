import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },
  role: {
    type: [String],
    required: true,
    enum: ["user", "admin"],
  },
  userId: {
    type: String,
    default: () => uuidv4().replace(/-/g, "").slice(0, 10),
    unique: true,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
