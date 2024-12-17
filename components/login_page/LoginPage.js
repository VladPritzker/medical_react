import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "./images/istockphoto-2046741640-612x612.webp";
import img2 from "./images/premium_photo-1719617672948-862f2f06e2a1.avif";
import img3 from "./images/premium_photo-1719617673012-4b121052cc8f.avif";
import img4 from "./images/premium_photo-1719617673192-61b02470619d.avif";

// Fetch the API URL from the environment
const apiUrl = process.env.REACT_APP_API_URL;

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSpecialist, setIsSpecialist] = useState(false); // New checkbox state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!isLogin && !usernameRegex.test(username)) {
      setErrorMessage("Username can only contain letters, numbers, and underscores.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const role = isSpecialist ? "users" : "client"; // Determine the role
      const endpoint = isLogin
        ? `${apiUrl}/${role}/login/`
        : `${apiUrl}/${role}/register/`;

      const requestBody = isLogin
        ? { email, password }
        : { email, password, username };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          const dashboardPath = isSpecialist
            ? "/specialist-dashboard"
            : "/client-dashboard";
          navigate(dashboardPath);
        } else {
          setIsLogin(true);
          setSuccessMessage("Registration successful! You can now log in.");
        }
        setErrorMessage("");
      } else {
        setErrorMessage(formatBackendErrors(data));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const formatBackendErrors = (data) => {
    if (typeof data === "string") return data;
    if (data.errors || typeof data === "object") {
      const messages = [];
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          messages.push(...data[key].map((err) => err));
        } else if (typeof data[key] === "string") {
          messages.push(data[key]);
        }
      });
      return messages.join(" ");
    }
    return "An error occurred. Please try again.";
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        {/* Checkbox for Specialists */}
        <label className="checkbox-container">
          I am a specialist
          <input
            type="checkbox"
            checked={isSpecialist}
            onChange={(e) => setIsSpecialist(e.target.checked)}
          />
          <span className="custom-checkbox"></span>
        </label>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <button
          type="button"
          className="switch-mode-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Need an account? Register" : "Have an account? Login"}
        </button>
      </form>

      <div className="slider-container">
        <Slider dots infinite autoplay autoplaySpeed={2000}>
          {[img1, img2, img3, img4].map((src, index) => (
            <div key={index}>
              <img src={src} alt={`slider-img-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default LoginPage;
