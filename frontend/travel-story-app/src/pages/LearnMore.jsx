import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Reuses your master layouts
import "./LearnMore.css"; // Your new custom stylesheets

const LearnMore = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill in all fields.");
      return;
    }
    
    setFormStatus("Sending message...");
    
    setTimeout(() => {
      console.log("Form submitted to Aditya Shah:", formData);
      setFormStatus("Thank you! Aditya will get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <main className="dashboard-container learn-more-container">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="bg-glow" />

      {/* HERO SECTION */}
      <div className="dashboard-hero learn-more-hero">
        <section className="hero-text-side">
          <span className="badge">Project Insights</span>
          <h1 className="hero-title">
            The Visionary <br />
            <span className="gradient-text">Behind the Code.</span>
          </h1>
          <p className="hero-subtitle">
            Travel Story is engineered to bridge real-world wanderlust with fast, sleek digital logging. Learn more about the creator and the application architecture.
          </p>
          <div className="cta-group">
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => navigate("/home")}
            >
              Launch Platform
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Return Home
            </button>
          </div>
        </section>

        {/* PROFILE CARD */}
        <section className="hero-visual-side">
          <div className="glass-card-wrapper dev-profile-card">
            <div className="profile-header">
              <div className="avatar-placeholder">AS</div>
              <div>
                <h2 className="dev-name">Aditya Shah</h2>
                <p className="dev-title">Full-Stack Developer</p>
              </div>
            </div>

            <div className="info-divider" />

            <div className="contact-row">
              <span className="icon-span">📞</span>
              <a href="tel:+919329621234" className="contact-link">+91 9329621234</a>
            </div>
            
            <div className="contact-row">
              <span className="icon-span">✉️</span>
              <a href="mailto:darkeyesgamingshorts@gmail.com" className="contact-link">darkeyesgamingshorts@gmail.com</a>
            </div>

            <div className="social-grid">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-btn"
              >
                Connect on LinkedIn
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-btn"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* TECH FEATURES */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>Modern Architecture</h3>
          <p>Built with React 18, Vite bundling pipelines, and custom CSS variables.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Secure Handshakes</h3>
          <p>Session profiles and tokens remain managed locally within strict boundaries.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Optimized Assets</h3>
          <p>Lightweight bundles make data renderings fluid on poor networks.</p>
        </div>
      </section>

      {/* INTERACTIVE FORM SECTION */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="section-heading">Have Questions? <span className="gradient-text">Get In Touch</span></h2>
          <p className="section-subtext">Drop Aditya a quick line right here to discuss collaborations, source contributions, or custom feature requests.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label className="input-label">Your Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="xyz" 
              className="input-field" 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com" 
              className="input-field" 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Message</label>
            <textarea 
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Hey Aditya, I loved your Travel Story application..." 
              className="textarea-field"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>

          {formStatus && (
            <p style={{ 
              marginTop: "1rem", 
              fontSize: "0.9rem", 
              color: formStatus.includes("Thank") ? "#4ade80" : "#ef4444",
              textAlign: "center" 
            }}>
              {formStatus}
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default LearnMore;
