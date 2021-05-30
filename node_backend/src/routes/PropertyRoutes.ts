import express from "express";
import Property, { IProperty } from "../models/PropertyModel";

const router = express.Router();

//router for adding a new property
router.post("", async (req, res) => {
  const newRecord: IProperty = new Property({
    property: req.body.property,
  });

  try {
    const saveRecord = await newRecord.save();
    res.status(201).json(saveRecord);
    console.log("property router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all property from the db
router.get("", async (req, res) => {
  try {
    const collection: Array<IProperty> = await Property.find();

    res.status(200).json(collection);

    console.log("property router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a property with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateRecord = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { property: req.body.property } }
    );

    res.status(200).json(updateRecord);

    console.log("property router patch success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a property with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeRecord = await Property.findByIdAndRemove({
      _id: req.params.id,
    });

    res.status(200).json(removeRecord);

    console.log("property router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
