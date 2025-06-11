import express from 'express';
import { registerUser, loginUser } from "../services/auth.js";

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await registerUser(username, password, role);
    res.status(201).json({ message: 'User registered', userId: user.userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await loginUser(username, password);
    res.json({ message: 'Logged in', token, userId: user.userId });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;