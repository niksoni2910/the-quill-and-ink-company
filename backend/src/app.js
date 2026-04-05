import express from "express";
import cors from "cors";
// import authRoutes from "./routes/auth.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

/* 🔥 IMPORTANT: increase payload limit */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const allowedOrigins = process.env.VERCEL_URL
  ? [`https://${process.env.VERCEL_URL}`, process.env.FRONTEND_URL].filter(
      Boolean
    )
  : undefined;

app.use(
  cors(
    allowedOrigins
      ? {
          origin: allowedOrigins,
          methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
          credentials: true,
        }
      : {}
  )
);


// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);

export default app;