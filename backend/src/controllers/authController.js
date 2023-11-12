import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import  Jwt from "jsonwebtoken";
import dotenv from 'dotenv'

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new userModel({
      username,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user registered");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) return res.status(404).send("_User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).send("Username or password not correct");
    const token = Jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT_KEY)
    const{passwrod, isAdmin,...props}= user._doc
    res.cookie("access_token", token,{
      httpOnly:true,
    }).status(200).send({...props});
  } catch (error) {
    console.log(error);
  }
};
