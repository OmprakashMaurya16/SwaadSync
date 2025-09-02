




import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import React, { useState } from "react";



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
    <>
      <Navbar user={user} />
      <Homepage user={user} onLogout={handleLogout} />
    </>
  );
}

export default App;
