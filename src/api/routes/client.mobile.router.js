import { Router } from "express";
import uploadMiddleware from "../utils/multer.js";
import mobile from "../controllers/mobile.controller.js";
import { authorized } from "../middlewares/authorization.js";

const router = Router();

router.get('/stock', authorized, mobile.getStock);

router.get('/mobile/:id', authorized, mobile.getMobile);

router.get('/add', authorized, mobile.postMobile);

router.get('/edit/:id', authorized, mobile.putMobile);

export default router;