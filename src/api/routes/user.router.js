import { Router } from "express";
import auth from "../controllers/user.controller.js";

const router = Router();

router.post('/login', auth.login);
router.post('/register', auth.register);

export default router