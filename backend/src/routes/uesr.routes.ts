import express from "express";
const router = express.Router();
import { register, login, logout, current } from "../controllers/user.controller";

// Register route
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current", current);

export default router;