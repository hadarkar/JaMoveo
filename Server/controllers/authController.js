import jwt from 'jsonwebtoken';
import { createUser, validateUser } from '../services/authService.js';

export const signup = async (req, res) => {
  const { username, password, instrument, role } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is undefined");
    return res.status(500).json({ message: "Server error - missing secret" });
  }

  try {
    const user = await createUser({ username, password, instrument, role });

    const token = jwt.sign(
      { id: user._id, role: user.role, instrument: user.instrument },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      token,
      user: { username: user.username, role: user.role, instrument: user.instrument },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is undefined");
    return res.status(500).json({ message: "Server error - missing secret" });
  }

  try {
    const user = await validateUser({ username, password });

    const token = jwt.sign(
      { id: user._id, role: user.role, instrument: user.instrument },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      user: { username: user.username, role: user.role, instrument: user.instrument },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
