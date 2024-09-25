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
  // try {
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
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

router.get("/", async (req, res) => {
  // try {
  await mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
});

// //Route to delete a book
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     return res.status(200).send({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.log(error.mesage);
//     res.status(500).send({ message: error.message });
//   }
// });

router.delete("/:id", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  try {
    const { id } = req.params;
    const result = await Booking.findByIdAndDelete(id);

    // console.log(id);

    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error.mesage);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
