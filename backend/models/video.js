const mongoose = require("mongoose");
const crypto = require("crypto");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: Number,
      required: true,
    },
    thumbnailPath: {
      type: String,
    },
    videoId: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(6).toString("hex"), // Generates a 12-character unique ID
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
