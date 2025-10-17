import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ onLogin, onShowSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email: username,
        password,
      });
      setLoading(false);

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLogin({ username, token: res.data.token });
      } else {
        setError(
          res.data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="ss-login-root">
      <form className="ss-login-form" onSubmit={handleSubmit}>
        <h2 className="ss-login-title">Login to SwaadSync</h2>
        <input
          className="ss-login-input"
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="ss-login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="ss-login-error">{error}</div>}
        <button className="ss-login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="ss-login-switch">
          Don't have an account?{" "}
          <span
            className="ss-login-link"
            onClick={onShowSignup}
            tabIndex={0}
            role="button"
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}
