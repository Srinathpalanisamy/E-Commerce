import db from "../config/db.js";

export const addToCart = (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!product_id) {
    return res.status(400).json({ error: "product_id is required" });
  }

  const checkQuery = "SELECT * FROM cart WHERE product_id = ? AND user_id = ?";

  db.query(checkQuery, [product_id, user_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      return res.status(500).json({ error: "Database error" });
    }

    if (checkResult.length > 0) {
      const updateQuery =
        "UPDATE cart SET quantity = quantity + ? WHERE product_id = ? AND user_id = ?";

      db.query(updateQuery, [quantity, product_id, user_id], (updateErr) => {
        if (updateErr) {
          console.log(updateErr);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Cart updated successfully" });
      });
    } else {
      const insertQuery =
        "INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)";

      db.query(insertQuery, [product_id, quantity, user_id], (insertErr) => {
        if (insertErr) {
          console.log(insertErr);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Product added to cart" });
      });
    }
  });
};

export const getCart = (req, res) => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    SELECT cart.id, cart.product_id, products.name, products.price, products.image, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
};

export const updateCartQuantity = (req, res) => {
  const cartItemId = Number(req.params.id);
  const amount = Number(req.body.amount);
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!Number.isInteger(cartItemId)) {
    return res.status(400).json({ error: "Invalid cart item id" });
  }

  if (!Number.isInteger(amount) || amount === 0) {
    return res.status(400).json({ error: "A valid quantity change is required" });
  }

  const selectQuery =
    "SELECT quantity FROM cart WHERE id = ? AND user_id = ?";

  db.query(selectQuery, [cartItemId, user_id], (selectErr, selectResult) => {
    if (selectErr) {
      console.log(selectErr);
      return res.status(500).json({ error: "Database error" });
    }

    if (selectResult.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const nextQuantity = Math.max(1, selectResult[0].quantity + amount);
    const updateQuery =
      "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?";

    db.query(updateQuery, [nextQuantity, cartItemId, user_id], (updateErr) => {
      if (updateErr) {
        console.log(updateErr);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Cart quantity updated", quantity: nextQuantity });
    });
  });
};

export const removeFromCart = (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.user_id;
  const query = "DELETE FROM cart WHERE product_id = ? AND user_id = ?";

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  db.query(query, [id, user_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Item removed from cart" });
  });
};

export const clearCart = (req, res) => {
  const user_id = req.user?.user_id;
  const query = "DELETE FROM cart WHERE user_id = ?";

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  db.query(query, [user_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Cart cleared" });
  });
};
