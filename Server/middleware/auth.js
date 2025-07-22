import jwt from "jsonwebtoken";

// Middleware לבדיקה ואימות טוקן JWT
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // אין בכלל טוקן?
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ודא ש־JWT_SECRET קיים בקובץ .env
    req.user = decoded; // נכניס את ה־payload לתוך הבקשה
    next(); // ממשיכים הלאה ל־controller
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};
