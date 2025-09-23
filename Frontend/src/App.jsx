import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CookbooksPage from "./pages/CookbooksPage/CookbooksPage";
import React, { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [page, setPage] = useState("home");

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
    <>
      <Navbar user={user} onNav={setPage} page={page} />
      {page === "home" && <Homepage user={user} onLogout={handleLogout} />}
      {page === "cookbooks" && <CookbooksPage />}
    </>
  );
}

export default App;
