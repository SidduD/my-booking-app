const express = require("express");
const jwt = require("jsonwebtoken");
const Place = require("../models/Place");
const Booking = require("../models/Booking");
const router = express.Router();
const mongoose = require("mongoose");
const { deleteFromS3 } = require("../s3utils");

const jwtSecret = "ffdfdfdfdfdfdf";

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//Create a new place
router.post("/", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

  // try {
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) res.json(err);
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    });
  }
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

//Return all the places belonging to a specific owner
router.get("/user-places", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  // try {
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

//Get a specific place based on id
router.get("/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  // try {
  res.json(await Place.findById(id));
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

//Update a specifc place based on id
router.put("/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { id } = req.params;
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

  // try {
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

//Delete a place based on id
router.delete("/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  try {
    const { token } = req.cookies;
    const { id } = req.params;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const place = await Place.findById(id);
      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      // Delete associated photos from S3
      const deletePromises = place.photos.map((photoUrl) => deleteFromS3(photoUrl));
      await Promise.all(deletePromises);

      await Place.findByIdAndDelete(id);

      await Booking.deleteMany({ place: id });

      return res.status(200).send({ message: "Place and associated booking deleted successfully" });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get all the places in the database
router.get("/", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  // try {
  res.json(await Place.find());
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

module.exports = router;
