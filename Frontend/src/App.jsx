import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CookbooksPage from "./pages/CookbooksPage/CookbooksPage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import React, { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPost, setSelectedPost] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setShowSignup(false);
    setSelectedPost(null); // Clear post when logging out
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const handleNavigation = (newPage) => {
    setPage(newPage);
    setSelectedPost(null); // Clear post when navigating
  };

  if (!user) {
    return showSignup ? (
      <Signup onSignup={setUser} onShowLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setUser} onShowSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <>
      {/* Always show navbar */}
      <Navbar user={user} onNav={handleNavigation} page={page} />
      
      {/* Conditional rendering based on whether a post is selected */}
      {selectedPost ? (
        <PostDetailPage 
          post={selectedPost} 
          onBack={handleClosePost}
          onPostClick={handlePostClick}
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {page === "home" && <Homepage user={user} onLogout={handleLogout} onPostClick={handlePostClick} />}
          {page === "cookbooks" && <CookbooksPage onPostClick={handlePostClick} />}
        </>
      )}
    </>
  );
}

export default App;
