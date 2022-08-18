import express from "express";
import { getLoginStatus, postLogin, postRegister} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", postLogin);

router.post("/register", postRegister);

router.get("/loginStatus", getLoginStatus);

export default router;