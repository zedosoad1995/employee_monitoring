import { Router } from "express";
import { updateMany } from "../controllers/workshift.controller";

const router = Router();

router.put("/", updateMany);

export default router;
