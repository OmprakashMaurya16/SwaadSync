import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SavedPost from "./pages/SavedPost/SavedPost";
import Explore from "./pages/Explore/Explore";
import Notification from "./pages/Notification/Notification";
import Post from "./pages/Post/Post";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowSignup(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Navbar user={user} />
                <Homepage user={user} onLogout={handleLogout} />
              </>
            ) : showSignup ? (
              <Signup onSignup={setUser} onShowLogin={() => setShowSignup(false)} />
            ) : (
              <Login onLogin={setUser} onShowSignup={() => setShowSignup(true)} />
            )
          }
        />
        <Route
          path="/saved"
          element={
            <>
              <Navbar user={user} />
              <SavedPost />
            </>
          }
        />
        <Route
          path="/explore"
          element={
            <>
              <Navbar user={user} />
              <Explore />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <Navbar user={user} />
              <Notification />
            </>
          }
        />
        <Route
          path="/post/:id"
          element={
            <>
              <Navbar user={user} />
              <Post />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
