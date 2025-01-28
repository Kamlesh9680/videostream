import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const PreviewPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
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
        setError("Failed to load video preview.");
        setLoading(false);
      }
    };
    // const getAds = () => {
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src =
    //     "//odourtaste.com/ac/9f/b1/ac9fb1270cfd01063202576d8aa10695.js";
    //   script.onload = () => {
    //     console.log("Social bar loaded successfully.");
    //   };

    //   document.body.appendChild(script);

    //   return () => {
    //     document.body.removeChild(script);
    //   };
    // };
    // getAds();
    fetchVideo();
  }, [videoId]);

  const handlePlayButtonClick = () => {
    navigate(`/video/${videoId}`); // Redirect to VideoPlayer page
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* <p className="text-red-600 text-lg font-semibold">{error}</p> */}
        <p className="text-red-600 text-lg font-semibold">
          Unable to fetch video. Please try again later.
        </p>
      </div>
    );

  return (
    <div className=" flex flex-col">
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

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <div id="container-4ced7c1d651ec6f9a4716f0cc9b5ba62"></div>

        <div className="w-full md:w-4/5 lg:w-3/5   mt-4  rounded-lg overflow-hidden">
          <img
            src={`/${video.thumbnailPath}`}
            alt="Video Thumbnail"
            className="w-full max-h-[400px] object-cover rounded-t-lg"
          />

          <div className="p-4 text-center">
            <p className="text-gray-700 text-base sm:text-lg font-medium">
              {video.title}
            </p>
            <button
              onClick={handlePlayButtonClick}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
