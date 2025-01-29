const express = require("express");
const Video = require("../models/video"); // Adjust the path to your Video model
const router = express.Router();

// Route to fetch all videos
router.get("/", async (req, res) => {
    try {
        const videos = await Video.find(); // Fetch all videos from the database
        res.status(200).json(videos); // Return the videos as JSON
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Failed to fetch videos" });
    }
});


// Route to fetch a video by videoId
router.get("/:videoId", async (req, res) => {
    const { videoId } = req.params;

    console.log("Fetching video with videoId:", videoId);

    try {
        const video = await Video.findOne({ videoId });
        if (!video) {
            console.log("Video not found with videoId:", videoId);
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(video);
    } catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ message: "Failed to fetch the video" });
    }
});

router.post("/:videoId/views", async (req, res) => {
    const { videoId } = req.params;

    try {
        // Find the video by ID and increment its view count
        const updatedVideo = await Video.findOneAndUpdate(
            { videoId },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        // console.log(updatedVideo.views)

        res.status(200).json({
            message: "View count updated successfully",
            video: updatedVideo,
        });
    } catch (error) {
        console.error("Error updating view count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
