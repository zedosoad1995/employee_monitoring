import { Router } from "express";
import { create, update } from "../controllers/subgroups.controller";

const router = Router();

router.put("/:id", update);
router.post("/", create);

export default router;
