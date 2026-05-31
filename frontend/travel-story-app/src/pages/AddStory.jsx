import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStory.css";

import API_URL from "../config";


const AddStory = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleAddStory = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("story", story);
      formData.append("visitedLocation", visitedLocation);
      formData.append("visitedDate", visitedDate);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(`${API_URL}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Story Added Successfully ✨");
      navigate("/home");

    } catch (error) {
      console.log(error);
      alert("Failed to add story");
    }
  };

  return (
    <div className="addstory-page">
      <div className="addstory-card">

        <div className="left-panel">
          <img src="image.png" alt="travel" />
          <div className="overlay-text">
            <h2>Create Memory</h2>
            <p>Turn your travel moments into stories 🌍</p>
          </div>
        </div>

        <div className="right-panel">
          <h1>Share Your Story</h1>
          <p>Share your adventure beautifully</p>

          <form onSubmit={handleAddStory}>

            <input
              type="text"
              placeholder="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Write your story..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Visited Location"
              value={visitedLocation}
              onChange={(e) =>
                setVisitedLocation(e.target.value)
              }
              required
            />

            <input
              type="date"
              value={visitedDate}
              onChange={(e) =>
                setVisitedDate(e.target.value)
              }
              required
            />

            <div className="file-upload-wrapper">
              <label
                htmlFor="story-file-upload"
                className="custom-file-upload"
              >
                📁 Choose Image
              </label>

              <input
                id="story-file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (
                    e.target.files &&
                    e.target.files.length > 0
                  ) {
                    const selectedFile =
                      e.target.files[0];

                    setImage(selectedFile);
                    setFileName(
                      selectedFile.name
                    );
                  }
                }}
              />

              {fileName && (
                <div className="file-status-success">
                  <span>
                    ✅ Selected:
                    <strong>
                      {" "}
                      {fileName}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <button type="submit">
              Publish Story
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStory;