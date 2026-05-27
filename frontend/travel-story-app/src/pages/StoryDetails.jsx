import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./StoryDetails.css";

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/story/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="story-details-page-wrapper">
        <div className="loading-spinner">
          Loading story...
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="story-details-page-wrapper">
        <div className="error-card">
          <h2>Story Not Found</h2>
          <button onClick={handleBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="story-details-page-wrapper">
      <div className="details-container">

        <button
          className="back-btn"
          onClick={handleBack}
        >
          ← Go Back
        </button>

        <div className="details-card">

          <div className="details-hero-image">
            <img
              src={
                story.image
                  ? `http://localhost:5000/uploads/${story.image}`
                  : "https://via.placeholder.com/800x500"
              }
              alt={story.title}
            />
          </div>

          <div className="details-body-content">

            <div className="details-meta">
              <span className="meta-date">
                🗓️{" "}
                {new Date(
                  story.visitedDate
                ).toDateString()}
              </span>

              <span className="meta-location">
                📍 {story.visitedLocation}
              </span>
            </div>

            <h1 className="details-title">
              {story.title}
            </h1>

            <div className="details-text">
              <p>{story.story}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;  