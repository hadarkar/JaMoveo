// server.js

import 'dotenv/config';
import express        from "express";
import http           from "http";
import cors           from "cors";
import mongoose       from "mongoose";

import authRoutes     from "./routes/authRoutes.js";
import sessionRoute   from "./routes/sessionRoute.js";
import searchRoute    from "./routes/searchRoute.js";  // ← הגדרת החיפוש
import { initSocket } from "./socket/socket.js";

const app    = express();
const server = http.createServer(app);

// אתחול Socket.IO
initSocket(server);

app.use(cors());
app.use(express.json());

// רישום ה‑API endpoints
app.use("/api/auth",     authRoutes);
app.use("/api/sessions",  sessionRoute);
app.use("/api/search",    searchRoute);   // ← כאן

// חיבור ל‑MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// הפעלת השרת
const PORT = process.env.PORT || 3001;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
