import { pool } from "../db.js";

/* CREATE CATEGORY (ADMIN) */
export const createCategory = async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ error: "Name and slug required" });
  }

  const result = await pool.query(
    `INSERT INTO categories (name, slug)
     VALUES ($1, $2)
     RETURNING *`,
    [name, slug]
  );

  res.status(201).json(result.rows[0]);
};

/* GET ALL CATEGORIES */
export const getCategories = async (_req, res) => {
  const result = await pool.query(
    `SELECT * FROM categories ORDER BY name`
  );
  res.json(result.rows);
};