import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if username or email already exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({
          error: "Conflict",
          message: "Username or email already exists.",
        });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new userModel({
        username,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(200).send("user registered");
    }
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

    const isPasswordCorrect = await bcrypt.compare(password, user._doc.password);

    if (!isPasswordCorrect)
      return res.status(400).send("Username or password not correct");

    //GENERATE TOKEN
    const token = Jwt.sign({id: user._id,username: user.username,email:user.email, isAdmin:user.isAdmin},
      process.env.JWT_KEY,
      { expiresIn: "6hr" }
    );
    // console.log();
    res.status(200).send( {
      username: user._doc.username,
      email: user._doc.email,
      id: user._doc._id,
      token: token,
    } );
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
