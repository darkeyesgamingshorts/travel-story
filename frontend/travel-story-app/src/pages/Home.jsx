import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import API_URL from "../config";

const demoStories = [
  {
    _id: "demo1",
    title: "Sketching Tokyo",
    story:
      "Himanshu's first morning in Tokyo began with the sharp, crisp bite of winter air. He caught the Yamanote Line and spent the day exploring the city.",
    visitedLocation: "Tokyo Japan",
    visitedDate: "2026-05-13",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
  },
  {
    _id: "demo2",
    title: "Pokemon",
    story:
      "Aditya was the kind of child who believed cartoons and anime were more than just shows. Every day felt like a new adventure.",
    visitedLocation: "Japan",
    visitedDate: "2030-12-28",
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Ash_Ketchum_Journeys.png",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [stories, setStories] = useState(demoStories);

  useEffect(() => {
    getPublicStories();
  }, []);

  const getPublicStories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/public-stories`
      );

      if (
        response.data &&
        response.data.length > 0
      ) {
        setStories(response.data);
      } else {
        setStories(demoStories);
      }
    } catch (error) {
      console.log(error);

      // If API fails, show demo stories
      setStories(demoStories);
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
                story._id.startsWith("demo")
                  ? null
                  : navigate(`/story/${story._id}`)
              }
              style={{
                cursor: story._id.startsWith("demo")
                  ? "default"
                  : "pointer",
              }}
            >
              <div className="image-container">
                <img
                  src={
                    story.image ||
                    "https://via.placeholder.com/400"
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
                  {story.story?.slice(0, 100)}
                  ...
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


/*import React, { useEffect, useState } from "react";
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

export default Home;*/