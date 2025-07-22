import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import sessionRoute from './routes/sessionRoute.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoute); 

// Socket connection
io.on('connection', (socket) => {
  console.log('New client:', socket.id);

  // Testing socketIO connection
  socket.on("test", (msg) => {
    console.log("Message from client:", msg);
  });

  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

server.listen(3001, () => console.log("Server running on port 3001"));
