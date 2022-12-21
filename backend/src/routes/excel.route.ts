import { getTemplate, uploadExcel } from "../controllers/excel.controller";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/upload", upload.single("file"), uploadExcel);
router.get("/:id", getTemplate);

export default router;
