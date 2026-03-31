import { pool } from "../db.js";

/* ================================
   CREATE PRODUCT
   POST /api/products
================================ */
export const createProduct = async (req, res) => {
  const { name, price, badge, categoryId, images } = req.body;

  if (!name || !price || !images?.length) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const productRes = await pool.query(
    `INSERT INTO products (name, price, badge, category_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, price, badge || null, categoryId || null]
  );

  const product = productRes.rows[0];

  for (const img of images) {
    await pool.query(
      `INSERT INTO product_images (product_id, image_base64)
       VALUES ($1, $2)`,
      [product.id, img]
    );
  }

  res.status(201).json(product);
};

/* ================================
   GET ALL PRODUCTS
   GET /api/products
================================ */
export const getProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  const values = [];
  let conditions = [`p.status = 'active'`];

  if (category) {
    values.push(category);
    conditions.push(`c.slug = $${values.length}`);
  }

  if (minPrice) {
    values.push(minPrice);
    conditions.push(`p.price >= $${values.length}`);
  }

  if (maxPrice) {
    values.push(maxPrice);
    conditions.push(`p.price <= $${values.length}`);
  }

  const query = `
    SELECT 
      p.*,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT image_base64
        FROM product_images
        WHERE product_id = p.id
        LIMIT 1
      ) AS image_base64
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE ${conditions.join(" AND ")}
    ORDER BY p.created_at DESC
  `;

  const result = await pool.query(query, values);
  res.json(result.rows);
};

/* ================================
   GET PRODUCT BY ID
   GET /api/products/:id
================================ */
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const productRes = await pool.query(
      `SELECT id, name, price, created_at
       FROM products
       WHERE id = $1`,
      [id]
    );

    if (productRes.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const imagesRes = await pool.query(
      `SELECT image_base64
       FROM product_images
       WHERE product_id = $1`,
      [id]
    );

    res.json({
      ...productRes.rows[0],
      images: imagesRes.rows.map((r) => r.image_base64),
    });
  } catch (err) {
    console.error("Get product by id error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

/* ================================
   UPDATE PRODUCT
   PUT /api/products/:id
================================ */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, images } = req.body;

  try {
    // 1️⃣ Update product fields
    const productRes = await pool.query(
      `UPDATE products
       SET name = COALESCE($1, name),
           price = COALESCE($2, price)
       WHERE id = $3
       RETURNING id, name, price`,
      [name, price, id]
    );

    if (productRes.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 2️⃣ If images provided → replace old images
    if (images && images.length > 0) {
      await pool.query(
        `DELETE FROM product_images WHERE product_id = $1`,
        [id]
      );

      for (const img of images) {
        await pool.query(
          `INSERT INTO product_images (product_id, image_base64)
           VALUES ($1, $2)`,
          [id, img]
        );
      }
    }

    res.json({
      success: true,
      product: productRes.rows[0],
    });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Product update failed" });
  }
};

/* ================================
   DELETE PRODUCT
   DELETE /api/products/:id
================================ */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM products
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // product_images auto-deleted via ON DELETE CASCADE
    res.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Product deletion failed" });
  }
};