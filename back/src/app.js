import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import localRoutes from "./routes/local.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: https://mdw-front.onrender.com,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api", productoRoutes);
app.use("/api", localRoutes);
app.use("/api", ventaRoutes);
app.use("/api", clienteRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
