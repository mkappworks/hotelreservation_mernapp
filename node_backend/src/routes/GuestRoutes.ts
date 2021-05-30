import express from "express";
import Guest, { IGuest } from "../models/GuestModel";

const router = express.Router();

//router for adding a new guest
router.post("", async (req, res) => {
  const newRecord: IGuest = new Guest({
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
  });

  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log("guest router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all guest from the db
router.get("", async (req, res) => {
  try {
    const collection: Array<IGuest> = await Guest.find();

    res.status(200).json(collection);

    console.log("guest router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a guest with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateRecord = await Guest.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: req.body.password,
          name: req.body.name,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
        },
      }
    );

    res.status(200).json(updateRecord);

    console.log("guest router patch success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a guest with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeRecord = await Guest.findByIdAndRemove({
      _id: req.params.id,
    });

    res.status(200).json(removeRecord);

    console.log("guest router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
