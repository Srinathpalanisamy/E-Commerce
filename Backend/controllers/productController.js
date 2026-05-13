import db from "../config/db.js";

// GET all products OR filter by category
export const getProducts = (req, res) => {
  const { category } = req.query;

  let query = "SELECT * FROM products";
  let values = [];

  if (category) {
    query += " WHERE category = ?";
    values.push(category);
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

// GET single product by id
export const getProductById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result[0]);
  });
};
