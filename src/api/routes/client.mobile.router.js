import { Router } from "express";
import uploadMiddleware from "../utils/multer.js";
import mobile from "../controllers/mobile.controller.js";

const router = Router();



router.get('/stock', mobile.getStock);

router.get('/mobile/:id', mobile.getMobile);

router.get('/add', mobile.postMobile);

router.get('/edit/:id', mobile.putMobile);

export default router;