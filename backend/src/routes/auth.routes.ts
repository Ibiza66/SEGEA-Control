import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida
router.get("/me", authenticate, profile);

export default router;