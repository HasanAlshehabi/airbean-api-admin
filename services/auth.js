import User from "../models/user.js";

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
  } else {
    if (await User.findOne({ username: username })) {
      return HTTPResponses["UsernameExists"];
    } else {
      return HTTPResponses["Created"];
    }
  }
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
