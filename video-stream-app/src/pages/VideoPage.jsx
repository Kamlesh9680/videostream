import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `/api/videos/${videoId}`
        );
        setVideo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load video.");
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <script
          type="text/javascript"
          src="//odourtaste.com/ac/9f/b1/ac9fb1270cfd01063202576d8aa10695.js"
        ></script>
        <script
          type="text/javascript"
          src="//odourtaste.com/15/cd/63/15cd634b9b3e5f00df8121d31e4132bc.js"
        ></script>
        <script
          type="text/javascript"
          src="//odourtaste.com/4ced7c1d651ec6f9a4716f0cc9b5ba62/invoke.js"
          async
          data-cfasync="false"
        ></script>
      </Helmet>
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <div id="container-4ced7c1d651ec6f9a4716f0cc9b5ba62"></div>
        {/* Video Container */}
        <div className="w-full md:w-4/5 lg:w-3/5 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Video Player */}
          <video
            controls
            className="w-full aspect-video rounded-t-lg"
            poster="https://placehold.co/1280x720.png?text=Video+Loading..."
          >
            <source
              src={`/${video.videoPath}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Video Details */}
          <div className="p-4">
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              <strong></strong> {video.title}
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              <strong> Size:</strong> {(video.size / (1024 * 1024)).toFixed(2)}{" "}
              MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
