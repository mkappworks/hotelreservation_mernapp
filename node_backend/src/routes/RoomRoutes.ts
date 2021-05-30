import express from "express";
import Room, { IRoom } from "../models/RoomModel";

const router = express.Router();

//router for adding a new room
router.post("", async (req, res) => {
  const newRecord: IRoom = new Room({
    property: req.body.property,
    room: req.body.room,
    view: req.body.view,
    bathtub: req.body.bathtub,
    balcony: req.body.balcony,
    wifi: req.body.wifi,
    floorArea: req.body.floorArea,
  });

  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log("room router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all room from the db
router.get("", async (req, res) => {
  try {
    const collection: Array<IRoom> = await Room.find();

    res.status(200).json(collection);

    console.log("room router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a room with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateRecord = await Room.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          property: req.body.property,
          room: req.body.room,
          view: req.body.view,
          bathtub: req.body.bathtub,
          balcony: req.body.balcony,
          wifi: req.body.wifi,
          floorArea: req.body.floorArea,
        },
      }
    );

    res.status(200).json(updateRecord);

    console.log("room router patch success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a room with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeRecord = await Room.findByIdAndRemove({
      _id: req.params.id,
    });

    res.status(200).json(removeRecord);

    console.log("room router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
