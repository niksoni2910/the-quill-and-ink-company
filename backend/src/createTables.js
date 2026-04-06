import { pool } from "./db.js";

const resetAndCreateTables = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS
        order_items,
        product_images,
        cart_items,
        carts,
        orders,
        products,
        categories,
        users
      CASCADE;
    `);

    console.log("🗑️ Tables dropped successfully");

    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- USERS
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        address TEXT,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- CATEGORIES
      CREATE TABLE categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- PRODUCTS
      CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(150) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        status VARCHAR(20) DEFAULT 'active',
        badge VARCHAR(50),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- PRODUCT IMAGES
      CREATE TABLE product_images (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        image_base64 TEXT NOT NULL
      );

      -- CARTS
      CREATE TABLE carts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        delivery_address TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- CART ITEMS
      CREATE TABLE cart_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        product_name VARCHAR(150),
        price NUMERIC(10,2),
        quantity INTEGER,
        custom_texts TEXT[]
      );

      -- ORDERS
      CREATE TABLE orders (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        shipping_address TEXT,
        price NUMERIC(10,2),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- ORDER ITEMS (Preserves snapshot after cart deletion)
      CREATE TABLE order_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        product_name VARCHAR(150),
        price NUMERIC(10,2),
        quantity INTEGER,
        custom_texts TEXT[]
      );
    `);

    console.log("✅ Tables dropped & recreated successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ DB reset error:", err);
    process.exit(1);
  }
};

resetAndCreateTables();