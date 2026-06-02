import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import API_URL from "../config";

const Home = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getPublicStories();
  }, []);

  const getPublicStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/public-stories`);

      setStories(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="navbar">
        <h1 className="logo">Travel Story</h1>

        <div className="auth-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/register")}
          >
            Signup
          </button>
        </div>
      </div>

      <div className="stories-container">
        <div className="story-grid">
          {stories.map((story) => (
            <div
              className="story-card"
              key={story._id}
              onClick={() =>
                navigate(`/story/${story._id}`)
              }
            >
              <div className="image-container">
                <img
                  src={
                    story.image ||
                    "http://via.placeholder.com/400"
                  }
                  alt={story.title}
                />
              </div>

              <div className="story-content">
                <h2>{story.title}</h2>

                <span className="story-date">
                  {new Date(
                    story.visitedDate
                  ).toDateString()}
                </span>

                <p>
                  {story.story?.slice(0, 100)}...
                </p>

                <div className="location-tag">
                  📍 {story.visitedLocation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;