import express from "express";
import { loginUser } from "../controllers/loginUser.js";
import { registerUser } from "../controllers/signup.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
