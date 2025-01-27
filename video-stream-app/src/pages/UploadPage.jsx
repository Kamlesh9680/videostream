import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);

  // Handle file change for multiple files
  const handleFileChange = (e) => {
    setFiles(e.target.files); // Store multiple files
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please select at least one video file.");
      return;
    }

    // Check if any file exceeds the size limit (1GB)
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1073741824) {
        setError("One or more files exceed the 1GB size limit.");
        return;
      }
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("videos", file); // This must match the field name in the backend
    });
    formData.append("title", title);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Videos uploaded successfully!");
      // Add all video URLs to the list
      setVideoUrls((prevUrls) => [
        ...prevUrls,
        ...response.data.videos.map((video) => video.videoUrl),
      ]);
    } catch (err) {
      setError("Error uploading videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center pb-6 w-full">
      <div className="container mx-auto p-6 flex items-stretch w-full gap-4">
        <form
          onSubmit={handleSubmit}
          className=" border shadow-lg rounded-lg p-6 w-1/2"
          style={{ borderColor: '#2c698d' }}
        >
          {/* <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-semibold text-gray-700"
            >
              Select Videos (up to 1GB each)
            </label>
            <input
              type="file"
              id="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full  mt-2 p-3 border bg-transparent rounded-lg"
              style={{ borderColor: '#2c698d' }}
              multiple // Allow multiple files
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#2c698d] text-white uppercase bold py-3 px-4 rounded-lg mt-4 hover:bg-[#272643] disabled:opacity-50 border-none"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Videos"}
          </button>
        </form>

        {/* Video URLs */}
        <div
          className="uploaded-urls shadow-md rounded-lg border p-4 bg-white w-1/2 "
          style={{ maxHeight: "500px", overflowY: "auto", borderColor: '#2c698d' }}
        >
          <h4 className="text-lg font-semibold mb-2">Uploaded Video URLs:</h4>
          {videoUrls.length > 0 ? (
            <ul className="list-disc pl-5">
              {videoUrls.map((url, index) => (
                <li key={index} className="text-blue-600 mb-2 underline">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
