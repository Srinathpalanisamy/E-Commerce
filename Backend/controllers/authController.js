import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      user_id: user.user_id,
      user_name: user.user_name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    return res.status(400).json({
      error: "user_name, email, and password are required",
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    db.query(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
        }

        if (result.length > 0) {
          return res.status(409).json({ error: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
          [user_name.trim(), normalizedEmail, hashedPassword],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Insert failed" });
            }

            const user = {
              user_id: result.insertId,
              user_name: user_name.trim(),
              email: normalizedEmail,
            };

            const token = generateToken(user);

            res.status(201).json({
              message: "User registered successfully",
              token,
              user,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const query = "SELECT id, user_name, email, password FROM users WHERE email = ?";

  db.query(query, [normalizedEmail], async (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Could not login user" });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userRecord = result[0];
    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = {
      user_id: userRecord.id,
      user_name: userRecord.user_name,
      email: userRecord.email,
    };

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  });
};

export const getProfile = (req, res) => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query =
    "SELECT user_name, email, phone, address, city, zip_code FROM users WHERE id = ?";

  db.query(query, [user_id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Could not fetch profile" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result[0]);
  });
};

export const updateProfile = (req, res) => {
  const user_id = req.user?.user_id;
  const { phone, address, city, zip_code } = req.body;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    UPDATE users
    SET phone = ?, address = ?, city = ?, zip_code = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [phone || "", address || "", city || "", zip_code || "", user_id],
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not update profile" });
      }

      res.json({ message: "Profile updated successfully" });
    }
  );
};
