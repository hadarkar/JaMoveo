// src/models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startedAt: { type: Date, default: null },
    song: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

// 🧠 יצירת המודל
const Session = mongoose.model("Session", sessionSchema);

// ✅ ייצוא כ־default כדי שהייבוא יעבוד עם import Session from ...
export default Session;
