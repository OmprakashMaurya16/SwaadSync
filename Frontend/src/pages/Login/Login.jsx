import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin, onShowSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    // Simulate login (replace with real API call)
    onLogin({ username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` });
  };

  return (
    <div className="ss-login-root">
      <form className="ss-login-form" onSubmit={handleSubmit}>
        <h2 className="ss-login-title">Login to SwaadSync</h2>
        <input
          className="ss-login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="ss-login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="ss-login-error">{error}</div>}
        <button className="ss-login-btn" type="submit">Login</button>
        <div className="ss-login-switch">
          Don't have an account?{' '}
          <span className="ss-login-link" onClick={onShowSignup} tabIndex={0} role="button">Sign up</span>
        </div>
      </form>
    </div>
  );
}
