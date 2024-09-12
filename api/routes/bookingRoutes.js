const express = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
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
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const { place, checkInDate, checkOutDate, phone, name, numGuests, price } = req.body;

    Booking.create({
      place,
      user: userData.id,
      checkInDate,
      checkOutDate,
      phone,
      name,
      numGuests,
      price,
    })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate("place"));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
