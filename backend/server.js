const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (req, res) => {
  res.json({ message: "Api is running!" });
});

app.post("/upload", upload.single("image"), (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file provided");
    }

    const params = {
      Bucket: "react-image-upload-project",
      Key: Date.now().toString(),
      Body: req.file.buffer,
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Failed to upload image" });
      } else {
        res.json({
          message: "Image uploaded successfully!",
          imageUrl: data.Location,
        });
      }
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

app.get("/images", (req, res) => {
  const params = {
    Bucket: "react-image-upload-project",
  };

  s3.listObjects(params, (err, data) => {
    if (err) {
      console.error("Error listing images:", err);
      res.status(500).json({ error: "Failed to retrieve images" });
    } else {
      const images = data.Contents.map((item) => ({
        key: item.Key,
        url: `https://react-image-upload-project.s3.amazonaws.com/${item.Key}`,
      }));
      res.json({ images });
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
