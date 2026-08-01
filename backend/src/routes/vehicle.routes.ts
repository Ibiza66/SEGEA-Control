import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { create, getAll } from "../controllers/vehicle.controller.js";

const router = Router();

// Solo los administradores pueden crear vehículos
router.get("/", authenticate, getAll);
router.post("/", authenticate, authorize("ADMIN"), create);

export default router;