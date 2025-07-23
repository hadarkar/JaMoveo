import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import sessionRoute from './routes/sessionRoute.js';
import { initSocket } from './socket/socket.js'; // ✅ חדש

dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server); // ✅ הזנקת סוקט

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoute);

// DB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

server.listen(3001, () => console.log("🚀 Server running on port 3001"));
