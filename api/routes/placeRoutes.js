const express = require("express");
const jwt = require("jsonwebtoken");
const Place = require("../models/Place");
const router = express.Router();
const mongoose = require("mongoose");

const jwtSecret = "ffdfdfdfdfdfdf";

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

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

router.get("/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  // try {
  res.json(await Place.findById(id));
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

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
