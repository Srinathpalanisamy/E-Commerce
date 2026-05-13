import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

const runSchemaQuery = (label, query) => {
  db.query(query, (error) => {
    if (error) {
      console.log(`${label} error:`, error);
    } else {
      console.log(`${label} ready`);
    }
  });
};

app.use(cors());
app.use(express.json());

app.use("/images", express.static("public/images"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

runSchemaQuery(
  "Users table",
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);

runSchemaQuery(
  "Cart table",
  `CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1
  )`
);

runSchemaQuery(
  "Orders table",
  `CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    zip_code VARCHAR(20),
    payment_method VARCHAR(50),
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'placed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`
);

runSchemaQuery(
  "Order items table",
  `CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  )`
);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});