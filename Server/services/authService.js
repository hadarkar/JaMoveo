import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async ({ username, password, instrument, role }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    instrument,
    role: role || 'user',
  });

  return user;
};

export const validateUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  return user;
};
