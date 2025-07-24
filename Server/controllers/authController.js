import jwt from 'jsonwebtoken';
import { createUser, validateUser } from '../services/authService.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ Missing JWT_SECRET in environment');
  // אופציונלי: throw new Error('Missing JWT_SECRET');
}

export const signup = async (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  try {
    const { username, password, instrument, role } = req.body;
    const user = await createUser({ username, password, instrument, role });

    const token = jwt.sign(
      {
        id:         user._id,
        username:   user.username,
        role:       user.role,
        instrument: user.instrument,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      token,
      user: {
        _id:        user._id,
        username:   user.username,
        role:       user.role,
        instrument: user.instrument,
      },
    });
  } catch (err) {
  console.error('❌ signup error:', err.message);
  if (err.message === "Username already exists") {
    return res.status(409).json({ message: err.message }); // חשוב: קוד סטטוס 409
  }
  res.status(400).json({ message: err.message });
}
};


export const login = async (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  try {
    const { username, password } = req.body;
    const user = await validateUser({ username, password });

    console.log('🔑 JWT_SECRET in login():', JWT_SECRET);

    const token = jwt.sign(
      {
        id:         user._id,
        username:   user.username,
        role:       user.role,
        instrument: user.instrument,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      user: {
        _id:        user._id,
        username:   user.username,
        role:       user.role,
        instrument: user.instrument,
      },
    });
  } catch (err) {
    console.error('❌ login error:', err.message);
    res.status(400).json({ message: err.message });
  }
};
