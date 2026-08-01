import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

// Ruta protegida
router.get("/me", authenticate, profile);

export default router;
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Bienvenido administrador",
    });
  }
);