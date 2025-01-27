import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js styles

const CustomVideoPlayer = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, options, () => {
        console.log("Video.js player is ready!");
      });

      // Handle errors
      playerRef.current.on("error", () => {
        console.error("Video.js error:", playerRef.current.error());
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <div>
        {options.sources && options.sources.length > 0 ? (
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
            controls
          ></video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
