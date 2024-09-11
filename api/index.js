const cors = require("cors");
// const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const placeRoutes = require("./routes/placeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

//Express middleware to read json
app.use(express.json());

//Middleware to read cookie from req headers
app.use(cookieParser());

//Middleware for CORS policy
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/uploads", express.static(__dirname + "/uploads"));

//Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/test", (req, res) => {
  res.json("test okk");
});

app.listen(4000);
