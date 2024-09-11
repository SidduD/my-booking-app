const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ffdfdfdfdfdfdf";

const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) res.json(err);
        res.cookie("token", token, { httpOnly: true, sameSite: "lax" }).json(userDoc);
      });
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

router.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) res.json(err);
      const { name, email, id } = await User.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

module.exports = router;
