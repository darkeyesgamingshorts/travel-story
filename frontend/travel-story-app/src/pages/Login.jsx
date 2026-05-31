import React, { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/my-stories");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div className="login-page">

      <div className="login-container">

        {/* LEFT */}

        <div className="login-left">

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt=""
          />

          <div className="overlay">

            <h1>
              Capture Your
              Journeys
            </h1>

            <p>
              Record your travel
              experiences and
              memories.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-right">

          <h1>Login</h1>

          <form
            onSubmit={handleLogin}
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <button type="submit">
              LOGIN
            </button>

          </form>

          <p className="register-text">
            Don't have an account?
          </p>

          <Link to="/register">

            <button className="register-btn">
              CREATE ACCOUNT
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;