import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hardcoded Admin Emails
    const ADMIN_EMAILS = ["thequillandinkcompany@gmail.com", "nikhilsoni2910@gmail.com"];
    const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";

    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone_number, address, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, phoneNumber, address, role]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(400).json({ error: "User already exists" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (!result.rows.length) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // FORCE ADMIN ROLE FOR HARDCODED EMAILS
  const ADMIN_EMAILS = ["thequillandinkcompany@gmail.com", "nikhilsoni2910@gmail.com"];
  if (ADMIN_EMAILS.includes(user.email) && user.role !== "admin") {
    await pool.query("UPDATE users SET role = 'admin' WHERE id = $1", [user.id]);
    user.role = "admin";
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};