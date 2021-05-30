import express from "express";
import RoomRate, { IRoomRate } from "../models/RoomRateModel";

const router = express.Router();

//router for adding a new roomrate
router.post("", async (req, res) => {
  const newRecord: IRoomRate = new RoomRate({
    boardingType: req.body.boardingType,
    numberOfGuest: req.body.numberOfGuest,
    rate: req.body.rate,
  });

  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log("roomrate router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all roomrate from the db
router.get("", async (req, res) => {
  try {
    const collection: Array<IRoomRate> = await RoomRate.find();

    res.status(200).json(collection);

    console.log("roomrate router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a roomrate with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateRecord = await RoomRate.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          boardingType: req.body.boardingType,
          numberOfGuest: req.body.numberOfGuest,
          rate: req.body.rate,
        },
      }
    );

    res.status(200).json(updateRecord);

    console.log("roomrate router patch success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a roomrate with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeRecord = await RoomRate.findByIdAndRemove({
      _id: req.params.id,
    });

    res.status(200).json(removeRecord);

    console.log("roomrate router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
