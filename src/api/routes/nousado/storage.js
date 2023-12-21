import { Router } from "express";
import postStorage from "../controllers/storage.controller.js";
import uploadMiddleware from "../config/multer.js";

const router = Router();

router.post('/storage', uploadMiddleware.multi('MyFile'), postStorage);

export default router