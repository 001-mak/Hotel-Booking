import express from 'express'
export const userRouter = express.Router();
import { createUser,deleteUser,getUser,getUsers,updateUser } from '../controllers/userController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';

userRouter.post("/", createUser)
userRouter.put("/:id",verifyUser, updateUser)
userRouter.delete("/:id", verifyUser, deleteUser)
userRouter.get("/:id",verifyUser, getUser)
userRouter.get("/", verifyAdmin, getUsers)
