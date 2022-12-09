import { Router } from "express";
import { create, deleteOne, update } from "../controllers/subgroups.controller";

const router = Router();

router.put("/:id", update);
router.post("/", create);
router.delete("/:id", deleteOne);

export default router;
