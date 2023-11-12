import express from 'express'
export const hotelRouter = express.Router();
import { verifyAdmin } from '../utils/verifyToken.js';
import { createHotel,deleteHotel,getHotel,getHotels,updateHotel } from '../controllers/hotelController.js';

hotelRouter.post("/",verifyAdmin, createHotel)
hotelRouter.put("/:id",verifyAdmin, updateHotel)
hotelRouter.delete("/:id",verifyAdmin, deleteHotel)
hotelRouter.get("/:id", getHotel)
hotelRouter.get("/", getHotels)