import { Router } from "express";
import auth from "../controllers/user.controller.js";

const router = Router();

router.get('/login', auth.viewLogin);
router.get('/register', auth.viewRegister);

export default router