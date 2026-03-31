import { pool } from "../db.js";

/* =========================
   ADD TO CART
========================= */
export const addToCart = async (req, res) => {
  const { productId, productName, price, quantity, customTexts } = req.body;

  if (!productId || !productName || !price || !quantity) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!Array.isArray(customTexts) || customTexts.length !== quantity) {
    return res.status(400).json({
      error: "Custom texts count must match quantity",
    });
  }

  try {
    // 1️⃣ Get or create cart
    const cartRes = await pool.query(
      `
      INSERT INTO carts (user_id)
      VALUES ($1)
      ON CONFLICT (user_id)
      DO UPDATE SET updated_at = NOW()
      RETURNING id
      `,
      [req.userId]
    );

    const cartId = cartRes.rows[0].id;

    // 2️⃣ Insert cart item
    const itemRes = await pool.query(
      `
      INSERT INTO cart_items
      (cart_id, product_id, product_name, price, quantity, custom_texts)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [cartId, productId, productName, price, quantity, customTexts]
    );

    res.status(201).json(itemRes.rows[0]);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

/* =========================
   GET CART (WITH IMAGE)
========================= */
export const getCart = async (req, res) => {
  try {
    const cartRes = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [req.userId]
    );

    if (!cartRes.rows.length) {
      return res.json({ items: [] });
    }

    const cart = cartRes.rows[0];

    const itemsRes = await pool.query(
      `
      SELECT
        ci.id,
        ci.product_id,
        ci.product_name,
        ci.price,
        ci.quantity,
        ci.custom_texts,
        (
          SELECT pi.image_base64
          FROM product_images pi
          WHERE pi.product_id = ci.product_id
          LIMIT 1
        ) AS image_base64
      FROM cart_items ci
      WHERE ci.cart_id = $1
      `,
      [cart.id]
    );

    res.json({
      ...cart,
      items: itemsRes.rows,
    });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

/* =========================
   UPDATE DELIVERY ADDRESS
========================= */
export const updateAddress = async (req, res) => {
  const { deliveryAddress } = req.body;

  if (!deliveryAddress) {
    return res.status(400).json({ error: "Delivery address required" });
  }

  try {
    await pool.query(
      `UPDATE carts SET delivery_address = $1 WHERE user_id = $2`,
      [deliveryAddress, req.userId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({ error: "Failed to update address" });
  }
};

/* =========================
   REMOVE CART ITEM
========================= */
export const removeItem = async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM cart_items WHERE id = $1`,
      [req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

/* =========================
   CHECKOUT
========================= */
export const checkout = async (req, res) => {
  try {
    const cartRes = await pool.query(
      `SELECT * FROM carts WHERE user_id = $1`,
      [req.userId]
    );

    if (!cartRes.rows.length) {
      return res.status(400).json({ error: "Cart not found" });
    }

    const cart = cartRes.rows[0];

    if (!cart.delivery_address) {
      return res
        .status(400)
        .json({ error: "Delivery address missing" });
    }

    const itemsRes = await pool.query(
      `SELECT price, quantity FROM cart_items WHERE cart_id = $1`,
      [cart.id]
    );

    const total = itemsRes.rows.reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    );

    const orderRes = await pool.query(
      `
      INSERT INTO orders (user_id, shipping_address, price)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [req.userId, cart.delivery_address, total]
    );

    // Clear cart
    await pool.query(
      `DELETE FROM cart_items WHERE cart_id = $1`,
      [cart.id]
    );

    res.json(orderRes.rows[0]);
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
};