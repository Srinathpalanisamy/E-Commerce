import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id || decoded.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const query = "SELECT id, user_name, email FROM users WHERE id = ?";

    db.query(query, [userId], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Authentication failed" });
      }

      if (result.length === 0) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = {
        user_id: result[0].id,
        user_name: result[0].user_name,
        email: result[0].email,
      };

      next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
