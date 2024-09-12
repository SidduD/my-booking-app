const express = require("express");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
require("dotenv").config();
const mime = require("mime-types");
const mongoose = require("mongoose");

const photosMiddleware = multer({ dest: "/tmp" });
const bucket = "siddu-my-booking-app";

async function uploadToS3(path, originalFileName, mimetype) {
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFileName.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

router.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: link,
      dest: "/tmp/" + newName,
    });

    const url = await uploadToS3("/tmp/" + newName, newName, mime.lookup("/tmp/" + newName));

    res.json(url);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];

  try {
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
