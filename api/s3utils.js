// s3Utils.js
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const bucket = "siddu-my-booking-app";

async function deleteFromS3(photoUrl) {
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const key = photoUrl.split("/").pop(); // Extract the file name from the URL

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
  } catch (err) {
    console.error(`Error deleting ${key} from S3:`, err);
  }
}

module.exports = { deleteFromS3 };
