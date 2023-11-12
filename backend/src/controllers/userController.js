import userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  const newUser = new userModel(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted");
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send("Server Error");
      console.log(error);
    }
  };