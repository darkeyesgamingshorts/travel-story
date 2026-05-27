import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="dashboard-container">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="bg-glow" />

      {/* HERO SECTION */}
      <div className="dashboard-hero">
        <section className="hero-text-side">
          <span className="badge">Beta Version 2.0</span>
          <h1 className="hero-title">
            Your Stories. <br />
            <span className="gradient-text">Your Way.</span>
          </h1>
          <p className="hero-subtitle">
            Save your memories, capture your journeys, and share your experiences on a platform designed entirely around your life.
          </p>
          <div className="cta-group">
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => navigate("/home")}
            >
              Get Started Free
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate("/learnmore")}
            >
              Learn More
            </button>
          </div>
        </section>

        <section className="hero-visual-side">
          <div className="glass-card-wrapper">
            <img
              src="image.png"
              alt="Dashboard visualization"
              className="main-dashboard-img"
            />
            {/* FLOATING STATS OVERLAY CARD */}
            <div className="floating-stat-card">
              <div className="stat-dot" />
              <div>
                <p className="stat-label">Active Journeys</p>
                <p className="stat-value">1,248 Total</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FEATURE CARDS SECTION */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📁</div>
          <h3>Secure Storage</h3>
          <p>End-to-end encryption for all your private memories and photos.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Geo Mapping</h3>
          <p>Track your travels automatically on an interactive global map.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>AI Insights</h3>
          <p>Generate beautiful summaries and trip highlights instantly.</p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
