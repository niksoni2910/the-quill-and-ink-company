import { pool } from "../db.js";

/* ================================
   GET ALL ORDERS (ADMIN ONLY)
   GET /api/orders/admin
================================ */
export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.shipping_address, o.price, o.status, o.created_at,
              u.name as user_name, u.email as user_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/* ================================
   UPDATE ORDER STATUS (ADMIN ONLY)
   PUT /api/orders/admin/:id/status
================================ */
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'pending', 'delivered', etc.

  try {
    const result = await pool.query(
      `UPDATE orders
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

/* ================================
   GET MY ORDERS (USER)
   GET /api/orders/my
================================ */
export const getMyOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ error: "Failed to fetch your orders" });
  }
};