import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function Signup({ onSignup, onShowLogin }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          name: fullname,
          email: email,
          password: password,
        }
      );
      setLoading(false);

      if (response.data.success || response.data.token) {
        onSignup({
          username: fullname,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullname}&size=256`,
          token: response.data.token,
        });
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError("Server error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="ss-signup-root">
      <form className="ss-signup-form" onSubmit={handleSubmit}>
        <h2 className="ss-signup-title">Sign Up for SwaadSync</h2>
        <input
          className="ss-signup-input"
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          className="ss-signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="ss-signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="ss-signup-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <div className="ss-signup-error">{error}</div>}
        <button className="ss-signup-btn" type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="ss-signup-switch">
          Already have an account?{" "}
          <span
            className="ss-signup-link"
            onClick={onShowLogin}
            tabIndex={0}
            role="button"
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
