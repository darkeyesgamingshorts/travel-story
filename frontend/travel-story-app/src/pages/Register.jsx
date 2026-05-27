import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Reusing your exact login styles

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/create-account",
        {
          fullName,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || 
        "Registration failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* LEFT BRANDING SIDE */}
        <div className="login-left">
          <img
            src="http://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Travel background"
          />
          
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="login-right">
          <h1>Create Account</h1>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              REGISTER
            </button>
          </form>

          <p className="register-text">
            Already have an account?
          </p>

          <Link to="/login">
            <button className="register-btn">
              LOGIN
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
