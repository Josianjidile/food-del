import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";




const router = express.Router();

// POST route for user registration
router.post("/register", registerUser);

// POST route for user login
router.post("/login", loginUser);

export default router;
