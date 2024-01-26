import { Router } from "express";
import auth from "../controllers/user.controller.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.post('/login', authorize, auth.login);
router.post('/register', authorize, auth.register);
router.get('/logout', auth.logout)

export default router