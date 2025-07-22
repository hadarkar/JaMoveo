import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    startedAt: { type: Date }, // חדש: מתי התחיל הסשן
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
