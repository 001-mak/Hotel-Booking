import express from 'express'
export const authRouter = express.Router();
import { register,login } from '../controllers/authController.js';

authRouter.post("/register", register);
authRouter.post("/login", login);