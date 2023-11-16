import roomModel from "../models/roomModel";
import hotelModel from "../models/hotelModel";

export const createRoom = async (req, res) => {
  const hotelID = req.params.hotelID;
  const newRoom = new roomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    console.log(error);
  }
};

export const updateRoom = async (req, res) => {
    try {
      const updatedRoom = await roomModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(500).send("Server Error");
      console.log(error);
    }
  };
  
  export const deleteRoom = async (req, res) => {
    const hotelID = req.params.hotelid;
    try {
      await roomModel.findByIdAndDelete(req.params.id);
      try {
        await hotelModel.findByIdAndUpdate(hotelID,{
            $pull:{rooms: req.params.id}
        })
      } catch (error) {
        
      }
      res.status(200).json("Room Deleted");
    } catch (error) {
      res.status(500).send("Server Error");
      console.log(error);
    }
  };
  
  export const getRoom = async (req, res) => {
    try {
      const room = await roomModel.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).send("Server Error");
      console.log(error);
    }
  };
  
  export const getRooms = async (req, res) => {
    try {
      const rooms = await roomModel.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).send("Server Error");
      console.log(error);
    }
  };
