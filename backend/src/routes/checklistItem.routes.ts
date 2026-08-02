import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/checklistItem.controller.js";

const router = Router();

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  create
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  remove
);

export default router;