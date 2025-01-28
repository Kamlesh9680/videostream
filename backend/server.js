const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const uploadRoute = require("./routes/videoUpload");
const videoRoute = require("./routes/videos");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

// Static folder for serving videos
app.use("/uploads", express.static("uploads"));
app.use("/thumbnails", express.static("thumbnails"));
app.use("/api/", uploadRoute);
app.use("/api/videos/", videoRoute);

app.listen(6000, () => {
    console.log("Server is running on http://localhost:6000");
});
