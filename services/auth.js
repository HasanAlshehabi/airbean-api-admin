import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const HTTPResponses = {
  Successful: {
    successful: true,
    statusCode: 200,
    message: "Operation was successful.",
  },
  Created: {
    successful: true,
    statusCode: 201,
    message: "User created successfully.",
  },
  MissingFields: {
    successful: false,
    statusCode: 400,
    message: "Missing required fields.",
  },
  UsernameExists: {
    successful: false,
    statusCode: 409,
    message: "Username already exists. Try another one!",
  },
};

export const validateRegistration = async (user) => {
  const { username, password, role } = user;

  if (!username || !password || !role) {
    return HTTPResponses["MissingFields"];
  }

  const exists = await User.findOne({ username: username });
  if (exists) {
    return HTTPResponses["UsernameExists"];
  }

  const createdUser = await User.create({
  username,
  password, 
  role,
});

  return {
    successful: true,
    statusCode: 201,
    message: "User created successfully.",
    user: createdUser,
  };
};


export const validateLogin = async (username, password) => {
  if (!username || !password) {
    return {
      success: false,
      message: "username and password are required",
    };
  }
  const user = await User.findOne({ username });
  if (!user) {
    return {
      success: false,
      message: "user not found",
    };
  }
  if (user.password !== password) {
    return {
      success: false,
      message: "invalid credentials",
    };
  }

  return {
    success: true,
    message: `Välkommen ${user.username} du är nu inloggad!`,
    user,
  };
};

const SECRET = process.env.JWT_SECRET || 'supersecret123';

export async function registerUser(username, password, role) {
  if (!username || !password || !role) throw new Error('Missing credentials');

  const exists = await User.findOne({ username });
  if (exists) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  return user;
}

export async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.userId, role: user.role }, SECRET, { expiresIn: '1h' });
  return { token, user };
}
