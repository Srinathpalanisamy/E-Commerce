import db from "../config/db.js";

export const createOrder = (req, res) => {
  const { items, total_price, address, city, zipCode, zip_code, phone, paymentMethod, firstName, lastName, email } = req.body;
  const user_id = req.user?.user_id;
  const user_name = req.user?.user_name;

  console.log(req.body, req.user);

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (user_id == null || total_price == null) {
    return res.status(400).json({ error: "user_id and total_price are required" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Items missing or invalid" });
  }

  const normalizedItems = items.map((item) => ({
    product_id: Number(item.product_id),
    quantity: Number(item.quantity ?? 1),
  }));

  const hasInvalidItem = normalizedItems.some(
    (item) =>
      !Number.isInteger(item.product_id) ||
      item.product_id <= 0 ||
      !Number.isFinite(item.quantity) ||
      item.quantity <= 0
  );

  if (hasInvalidItem) {
    return res.status(400).json({ error: "Invalid order items" });
  }

  const productIds = [...new Set(normalizedItems.map((item) => item.product_id))];
  const productQuery = "SELECT id, price FROM products WHERE id IN (?)";

  db.query(productQuery, [productIds], (productError, productRows) => {
    if (productError) {
      console.log(productError);
      return res.status(500).json({ error: "Could not validate products" });
    }

    if (productRows.length !== productIds.length) {
      return res.status(400).json({ error: "One or more products do not exist" });
    }

    const priceMap = new Map(
      productRows.map((product) => [Number(product.id), Number(product.price)])
    );

    const orderItems = normalizedItems.map((item) => ({
      ...item,
      price: priceMap.get(item.product_id),
    }));

    const updateUserQuery = `
      UPDATE users
      SET phone = ?, address = ?, city = ?, zip_code = ?
      WHERE id = ?
    `;

    db.query(
      updateUserQuery,
      [phone || "", address || "", city || "", zipCode || zip_code || "", user_id],
      (updateUserError) => {
        if (updateUserError) {
          console.log(updateUserError);
          return res.status(500).json({ error: "Could not update user details" });
        }

        db.beginTransaction((transactionError) => {
          if (transactionError) {
            console.log(transactionError);
            return res.status(500).json({ error: "Could not start transaction" });
          }

          const orderQuery = `
            INSERT INTO orders (user_id, user_name, total_price, customer_name, email, address, city, zip_code, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          db.query(
            orderQuery,
            [
              user_id,
              user_name,
              total_price,
              `${firstName || ""} ${lastName || ""}`.trim(),
              email || "",
              address || "",
              city || "",
              zipCode || zip_code || "",
              paymentMethod || "",
            ],
            (orderError, orderResult) => {
              if (orderError) {
                return db.rollback(() => {
                  console.log(orderError);
                  res.status(500).json({ error: "Order insert failed" });
                });
              }

              const orderId = orderResult.insertId;
              const values = orderItems.map((item) => [
                orderId,
                item.product_id,
                item.quantity,
                item.price,
              ]);

              const itemQuery =
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";

              db.query(itemQuery, [values], (itemError) => {
                if (itemError) {
                  return db.rollback(() => {
                    console.log(itemError);
                    res.status(500).json({ error: "Order items failed" });
                  });
                }

                db.commit((commitError) => {
                  if (commitError) {
                    return db.rollback(() => {
                      console.log(commitError);
                      res.status(500).json({ error: "Order commit failed" });
                    });
                  }

                  res.status(201).json({
                    message: "Order created successfully",
                    order: {
                      id: orderId,
                      user_id,
                      user_name,
                      total_price,
                      created_at: new Date().toISOString(),
                      items: orderItems,
                    },
                  });
                });
              });
            }
          );
        });
      }
    );
  });
};

export const getOrders = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    SELECT
      orders.id AS order_id,
      orders.user_id,
      orders.user_name,
      orders.total_price,
      orders.status,
      orders.created_at,
      order_items.id AS order_item_id,
      order_items.product_id,
      order_items.quantity,
      order_items.price,
      products.name,
      products.category,
      products.image
    FROM orders
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN products ON order_items.product_id = products.id
    WHERE orders.user_id = ?
    ORDER BY orders.created_at DESC, order_items.id ASC
  `;

  db.query(query, [req.user.user_id], (error, rows) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Could not fetch orders" });
    }

    const ordersMap = new Map();

    rows.forEach((row) => {
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          id: row.order_id,
          user_id: row.user_id,
          user_name: row.user_name,
          total_price: row.total_price,
          status: row.status,
          created_at: row.created_at,
          items: [],
        });
      }

      if (row.order_item_id) {
        ordersMap.get(row.order_id).items.push({
          id: row.order_item_id,
          product_id: row.product_id,
          name: row.name,
          category: row.category,
          image: row.image,
          quantity: row.quantity,
          price: row.price,
        });
      }
    });

    res.json(Array.from(ordersMap.values()));
  });
};

export const cancelOrder = (req, res) => {
  const orderId = req.params.id;
  const user_id = req.user?.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    UPDATE orders
    SET status = 'cancelled'
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [orderId, user_id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Could not cancel order" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order cancelled successfully" });
  });
};