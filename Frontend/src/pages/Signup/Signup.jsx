import React, { useState } from "react";
import "./Signup.css";

export default function Signup({ onSignup, onShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate signup (replace with real API call)
    onSignup({ username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` });
  };

  return (
    <div className="ss-signup-root">
      <form className="ss-signup-form" onSubmit={handleSubmit}>
        <h2 className="ss-signup-title">Sign Up for SwaadSync</h2>
        <input
          className="ss-signup-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="ss-signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="ss-signup-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {error && <div className="ss-signup-error">{error}</div>}
        <button className="ss-signup-btn" type="submit">Sign Up</button>
        <div className="ss-signup-switch">
          Already have an account?{' '}
          <span className="ss-signup-link" onClick={onShowLogin} tabIndex={0} role="button">Login</span>
        </div>
      </form>
    </div>
  );
}
