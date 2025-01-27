const express = require("express");
const multer = require("multer");
const path = require("path");
const Video = require("../models/video");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const router = express.Router();

// Configure ffmpeg-static
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Use a timestamp to avoid filename collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with file size limit (1GB per file)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1073741824 }, // 1GB limit per file
});

// Video upload route for multiple videos
router.post("/upload", upload.array("videos", 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  try {
    const uploadedVideos = [];

    // Process each uploaded video
    for (const file of req.files) {
      const videoPath = file.path;
      const thumbnailPath = `../thumbnails/${Date.now()}-${path.basename(videoPath, path.extname(videoPath))}.jpg`;
      const thumbnailFullPath = path.join(__dirname, "../", thumbnailPath);

      // Generate thumbnail
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .on("end", resolve) // Thumbnail generation successful
          .on("error", (err) => {
            console.error("Error generating thumbnail:", err);
            reject(err);
          })
          .screenshots({
            count: 1, // Generate one thumbnail
            folder: path.join(__dirname, "../thumbnails"), // Output folder
            filename: path.basename(thumbnailFullPath), // Thumbnail filename
            size: "320x240", // Thumbnail dimensions
          });
      });

      // Save video metadata to MongoDB
      const video = new Video({
        title: req.body.title || file.originalname, // Use the title from request body or fallback to original filename
        videoPath: file.path,
        size: file.size,
        thumbnailPath: thumbnailPath, // Save thumbnail path in the database
      });

      await video.save();
      const videoUrl = `https://safeboxhub.in/video/${video.videoId}`;

      uploadedVideos.push({
        title: video.title,
        videoPath: video.videoPath,
        size: video.size,
        uploadDate: video.uploadDate,
        thumbnailPath: video.thumbnailPath,
        videoUrl,
      });
    }

    res.json({
      message: "Videos uploaded successfully",
      videos: uploadedVideos,
    });
  } catch (error) {
    console.error("Error processing videos:", error);
    res.status(500).json({ message: "Failed to process video uploads." });
  }
});


module.exports = router;
