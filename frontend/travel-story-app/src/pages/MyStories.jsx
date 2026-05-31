import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyStories.css";

import API_URL from "../config";


const MyStories = () => {
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_URL}/search-stories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStories(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const searchStories = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_URL}/search-stories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filtered = response.data.filter(
        (story) =>
          story.title
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          story.story
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          story.visitedLocation
            .toLowerCase()
            .includes(query.toLowerCase())
      );

      setStories(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const triggerDeletePrompt = (story) => {
    setStoryToDelete(story);
    setConfirmText("");
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${API_URL}/delete-story/${storyToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowDeleteModal(false);
      fetchStories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mystories-page-wrapper">
      <div className="navbar">
  <h1 className="logo">My Stories</h1>

  <div className="story-actions-group">
    <button
      className="add-story-btn"
      onClick={() => navigate("/add-story")}
    >
      + Add Story
    </button>

    <button
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}
    >
      Logout
    </button>
  </div>
</div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search stories..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        <button
          onClick={searchStories}
        >
          Search
        </button>
      </div>

      <div className="stories-container">
        <div className="story-grid">

          {stories.map((story) => (

            <div
              className="story-card"
              key={story._id}
            >
              <div className="image-container">
                <img
                  src={
                    story.image
                      ? `${API_URL}/uploads/${story.image}`
                      : "http://via.placeholder.com/400"
                  }
                  alt={story.title}
                />
              </div>

              <div className="story-content">

                <h2>
                  {story.title}
                </h2>

                <span className="story-date">
                  {new Date(
                    story.visitedDate
                  ).toDateString()}
                </span>

                <p>
                  {story.story?.slice(
                    0,
                    100
                  )}...
                </p>

                <div className="location-tag">
                  📍{" "}
                  {
                    story.visitedLocation
                  }
                </div>

                <div className="actions">

                  <button
                    onClick={() =>
                      navigate(
                        `/edit-story/${story._id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      triggerDeletePrompt(
                        story
                      )
                    }
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/story/${story._id}`
                      )
                    }
                  >
                    View
                  </button>

                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      {showDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal-content">

      <button
        className="close-x-btn"
        onClick={() => setShowDeleteModal(false)}
      >
        ×
      </button>

      <div className="modal-header-block">
        <div className="warning-icon">⚠️</div>

        <h2>Drop Story?</h2>
      </div>

      <p className="modal-description-text">
        Are you sure you want to drop collection{" "}
        <strong>"{storyToDelete?.title}"</strong>?
      </p>

      <label className="confirm-label">
        Type "<strong>{storyToDelete?.title}</strong>" to confirm your action
      </label>

      <input
        className="confirm-input"
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
      />

      <div className="modal-action-buttons">
        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="drop-btn"
          disabled={confirmText !== storyToDelete?.title}
          onClick={handleConfirmDelete}
        >
          Drop Story
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default MyStories;