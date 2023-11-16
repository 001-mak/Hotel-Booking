import hotelModel from "../models/hotelModel.js";

export const createHotel = async (req, res) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted");
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
};
