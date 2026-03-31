import { pool } from "../db.js";

export const getMe = async (req, res) => {
  const result = await pool.query(
    `SELECT id, name, email, phone_number, address
     FROM users WHERE id = $1`,
    [req.userId]
  );

  res.json(result.rows[0]);
};

export const updateMe = async (req, res) => {
  const { name, phoneNumber, address } = req.body;

  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         phone_number = $2,
         address = $3
     WHERE id = $4
     RETURNING id, name, email, phone_number, address`,
    [name, phoneNumber, address, req.userId]
  );

  res.json(result.rows[0]);
};