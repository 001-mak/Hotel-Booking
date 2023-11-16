import express from 'express'
export const roomRouter = express.Router();
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom,deleteRoom,getRoom,getRooms,updateRoom } from '../controllers/roomController.js';

roomRouter.post("/:id",verifyAdmin, createRoom)
roomRouter.put("/:id",verifyAdmin, updateRoom)
roomRouter.delete("/:id",verifyAdmin, deleteRoom)
roomRouter.get("/:id", getRoom)
roomRouter.get("/", getRooms)