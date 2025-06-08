import Router from "express";
import {
  validateRegistration,
  validateLogin,
  HTTPResponses,
} from "../services/auth.js";
import User from "../models/user.js";
import { setActiveUser } from "../globalActiveUser/globalActiveUser.js";

const router = Router();

//POST Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await validateLogin(username, password);

  if (!result.success) {
    return res.status(401).json({
      success: false,
      message: result.message,
    });
  }
  const user = result.user;
  setActiveUser(user);

  res.json({
    success: true,
    message: result.message,
    user: {
      username: user.username,
      userId: user.userId,
    },
  });
});
//GET Logout
router.get("/logout", (req, res) => {
  setActiveUser({});
  res.status(200).json({
    success: true,
    message: "You logged out",
  });
});

//POST Register
router.post("/register", async (req, res) => {
  const user = req.body;
  const validationResult = await validateRegistration(user);

  if (validationResult) {
    if (!validationResult.successful) {
      res.status(validationResult.statusCode).json(validationResult);
    } else {
      try {
        const createdUser = await User.create(user);
        if (createdUser) {
          res.status(HTTPResponses["Created"].statusCode).json(createdUser);
        }
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  }
});

export default router;
