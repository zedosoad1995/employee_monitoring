import { getTemplate } from "../controllers/excel.controller";
import { Router } from "express";

const router = Router();

router.get("/", getTemplate);
router.get("/:id", getTemplate);

export default router;
