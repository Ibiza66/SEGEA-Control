import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Backend de SEGEA funcionando correctamente",
  });
});

app.use("/auth", authRoutes);
app.use(errorMiddleware);
export default app;