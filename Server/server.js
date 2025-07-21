import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// socket connection
io.on('connection', (socket) => {
  console.log('New client:', socket.id);


  //Testing sockeIO connection
  socket.on("test", (msg) => {
    console.log("Message from client:", msg);
  });

  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

server.listen(3001, () => console.log("Server running on port 3001"));
