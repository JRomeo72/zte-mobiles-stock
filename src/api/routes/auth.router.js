import { Router } from "express";
import auth from "../controllers/user.controller.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.get('/', authorize, auth.viewHome);
router.get('/login', authorize, auth.viewLogin);
router.get('/register', authorize, auth.viewRegister);

export default router