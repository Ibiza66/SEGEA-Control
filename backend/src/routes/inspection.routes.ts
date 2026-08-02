import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/inspection.controller.js";

const router = Router();

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.put("/:id", authenticate, update);
router.delete(
  "/:id",
  authenticate,
  remove
);

router.post("/", authenticate, create);

export default router;