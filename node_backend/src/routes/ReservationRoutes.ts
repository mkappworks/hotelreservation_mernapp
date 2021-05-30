import express from "express";
import Reservation, { IReservation } from "../models/ReservationModel";

const router = express.Router();

//router for adding a new roomrate
router.post("", async (req, res) => {
  const newRecord: IReservation = new Reservation({
    guest: req.body.guest,
    room: req.body.room,
    checkinDateTime: req.body.checkinDateTime,
    numberOfNights: req.body.numberOfNights,
    boardingType: req.body.boardingType,
    numberOfGuest: req.body.numberOfGuest,
    paymentType: req.body.paymentType,
    parking: req.body.parking,
    roomAmenities: req.body.roomAmenities,
    note: req.body.note,
    cancellationStatus: req.body.cancellationStatus,
    cancellationDateTime: req.body.cancellationDateTime,
    amount: req.body.amount,
  });

  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log("reservation router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all roomrate from the db
router.get("", async (req, res) => {
  try {
    const collection: Array<IReservation> = await Reservation.find();

    res.status(200).json(collection);

    console.log("reservation router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a roomrate with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateRecord = await Reservation.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          guest: req.body.guest,
          room: req.body.room,
          checkinDateTime: req.body.checkinDateTime,
          numberOfNights: req.body.numberOfNights,
          boardingType: req.body.boardingType,
          numberOfGuest: req.body.numberOfGuest,
          paymentType: req.body.paymentType,
          parking: req.body.parking,
          roomAmenities: req.body.roomAmenities,
          note: req.body.note,
          cancellationStatus: req.body.cancellationStatus,
          cancellationDateTime: req.body.cancellationDateTime,
          amount: req.body.amount,
        },
      }
    );

    res.status(200).json(updateRecord);

    console.log("reservation router patch success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a roomrate with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeRecord = await Reservation.findByIdAndRemove({
      _id: req.params.id,
    });

    res.status(200).json(removeRecord);

    console.log("reservation router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
