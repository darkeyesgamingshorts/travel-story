import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import API_URL from "../config";

const demoStories = [
  {
    _id: "1",
    title: "Sketching Tokyo",
    visitedDate: "2026-05-13",
    story:
      "Himanshu’s first morning in Tokyo began with the sharp, crisp bite of winter air. He caught the Yamanote Line and explored the glowing streets of Shibuya.",
    visitedLocation: "Tokyo Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    _id: "2",
    title: "Pokemon Adventure",
    visitedDate: "2030-12-28",
    story:
      "Aditya believed anime was more than entertainment. Visiting Japan felt like stepping directly into the world he always dreamed about.",
    visitedLocation: "Japan",
    image:
      "https://wallpapercave.com/wp/wp8846263.jpg",
  },
  {
    _id: "3",
    title: "Paris Memories",
    visitedDate: "2025-08-11",
    story:
      "The Eiffel Tower looked unreal at night. Street music, coffee shops, and rain made Paris unforgettable.",
    visitedLocation: "Paris France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // show demo stories immediately
  const [stories, setStories] = useState(demoStories);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicStories();
  }, []);

  const getPublicStories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/public-stories`
      );

      // if backend has data use it
      if (response.data?.length > 0) {
        setStories(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

      {loading && (
        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Loading stories...
        </p>
      )}

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
                  src={story.image}
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