import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import {hotelRouter} from "./src/routes/hotelRouter.js"
import {userRouter} from "./src/routes/userRouter.js"
import { authRouter } from './src/routes/authRouter.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/hotels", hotelRouter)
app.use("/users", userRouter)
app.use("/auth", authRouter)


const connect =  async ()=>{
    try {
        await mongoose.connect(process.env.MONGOKEY);
        console.log("MongoDb connected!")
        
    } catch (error) {
        console.log(error)
    }
}
app.listen(3000, ()=>{
    connect();
    console.log("connected!")
})