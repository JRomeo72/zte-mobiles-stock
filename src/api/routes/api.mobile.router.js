import { Router } from "express";
import uploadMiddleware from "../utils/multer.js";
import mobile from "../controllers/mobile.controller.js";
import { authorized } from "../middlewares/authorization.js";

const router = Router();

router.get('/stock', authorized, mobile.getStock);

router.get('/mobile/:id', authorized, mobile.getMobile);

router.post('/add', authorized, uploadMiddleware.single('imagen'), mobile.postMobile);
// router.post('/add', uploadMiddleware.array('photo', 2), mobile.postMobile);

router.put('/edit/:id', authorized, uploadMiddleware.single('imagen'), mobile.putMobile);

router.delete('/delete/:id', authorized, mobile.deleteMobile);


export default router;