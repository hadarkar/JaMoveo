import 'dotenv/config';       // טוען אוטומטית את ה־.env לפני שאר הקוד
// import dotenv from 'dotenv';
// // dotenv.config();  // ⬅️ טען את משתני הסביבה בתחילת התהליך

import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import sessionRoute from './routes/sessionRoute.js';
import { initSocket } from './socket/socket.js';

const app = express();
const server = http.createServer(app);

// לאתחול Socket.IO
initSocket(server);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoute);

// Debug: ודא שה‑JWT_SECRET נטען
console.log('🔑 JWT_SECRET at startup:', process.env.JWT_SECRET);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ Mongo connection error:', err));

server.listen(process.env.PORT || 3001, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 3001}`)
);
