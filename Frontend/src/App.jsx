import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SavedPost from "./pages/SavedPost/SavedPost";
import Explore from "./pages/Explore/Explore";
import Notification from "./pages/Notification/Notification";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowSignup(false);
  };

  if (!user) {
    return showSignup ? (
      <Signup onSignup={setUser} onShowLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setUser} onShowSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Homepage user={user} onLogout={handleLogout} />} />
        <Route path="/saved" element={<SavedPost />} />
        <Route path="/explore" element={<Explore />} />
  <Route path="/notifications" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;
