import { Router } from "express";
import uploadMiddleware from "../config/multer.js";
import mobile from "../controllers/mobile.controller.js";

const router = Router();

router.get('/stock', mobile.getStock);
router.get('/mobile/:id', mobile.getMobile);
router.get('/add', mobile.postMobile);
router.post('/add', uploadMiddleware.single('imagen'), mobile.postMobile);
// router.post('/add', uploadMiddleware.array('photo', 2), mobile.postMobile);
router.put('/edit/:id', mobile.putMobile);
router.delete('/delete/:id', mobile.deleteMobile);


export default router;