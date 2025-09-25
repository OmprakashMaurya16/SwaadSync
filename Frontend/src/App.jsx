import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SavedPost from "./pages/SavedPost/SavedPost";
import Explore from "./pages/Explore/Explore";
import Notification from "./pages/Notification/Notification";
import Post from "./pages/Post/Post";
import CookbooksPage from "./pages/CookbooksPage/CookbooksPage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import CreateRecipeModal from "./components/CreateRecipeModal/CreateRecipeModal";

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ user, children }) {
  return !user ? children : <Navigate to="/" replace />;
}

function Layout({ user, onLogout, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/cookbooks") return "cookbooks";
    if (path === "/saved") return "saved";
    if (path === "/explore") return "explore";
    if (path === "/notifications") return "notifications";
    if (path === "/create") return "create";
    if (path.startsWith("/post/")) {
      return "home";
    }
    return "home";
  };

  const handleNavigation = (newPage) => {
    const routeMap = {
      home: "/",
      create:"/create",
      cookbooks: "/cookbooks",
      saved: "/saved",
      explore: "/explore",
      notifications: "/notifications"
    };
    
    if (routeMap[newPage]) {
      navigate(routeMap[newPage]);
    }
  };

  return (
    <>
      <Navbar user={user} onNav={handleNavigation} page={getCurrentPage()} />
      {children}
    </>
  );
}

function CreateWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccess = (newRecipe) => {
    if (newRecipe && newRecipe._id) {
      navigate(`/post/${newRecipe._id}`, { state: { from: location.pathname } });
    } else {
      navigate("/");
    }
  };

  return (
    <CreateRecipeModal
      open={true}
      onClose={() => navigate("/")}
      onSuccess={handleSuccess}
      user={user}
    />
  );
}

function PostDetailWrapper({ user, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/";

  const handleBack = () => {
    navigate(from);
  };

  return (
    <PostDetailPage
      postId={id}
      user={user}
      onLogout={onLogout}
      onBack={handleBack}
    />
  );
}

function HomepageWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (recipe) => {
    navigate(`/post/${recipe._id}`, { state: { from: location.pathname } });
  };

  return (
    <Homepage
      user={user}
      onLogout={onLogout}
      onPostClick={handlePostClick}
    />
  );
}

function CookbooksPageWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, { state: { from: location.pathname } });
  };

  return (
    <CookbooksPage
      onPostClick={handlePostClick}
      user={user}
    />
  );
}

function SavedPostWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, { state: { from: location.pathname } });
  };

  return (
    <SavedPost
      onPostClick={handlePostClick}
      user={user}
    />
  );
}

function ExploreWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, { state: { from: location.pathname } });
  };

  return (
    <Explore
      onPostClick={handlePostClick}
      user={user}
    />
  );
}

function NotificationWrapper({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostClick = (post) => {
    navigate(`/post/${post.id}`, { state: { from: location.pathname } });
  };

  return (
    <Notification
      onPostClick={handlePostClick}
      user={user}
    />
  );
}

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    onLogin(userData);
  };

  const handleShowSignup = () => {
    navigate("/signup");
  };

  return (
    <Login onLogin={handleLogin} onShowSignup={handleShowSignup} />
  );
}

function SignupWrapper({ onSignup }) {
  const navigate = useNavigate();

  const handleSignup = (userData) => {
    onSignup(userData);
  };

  const handleShowLogin = () => {
    navigate("/login");
  };

  return (
    <Signup onSignup={handleSignup} onShowLogin={handleShowLogin} />
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const signup = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute user={user}>
              <LoginWrapper onLogin={login} />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/signup" 
          element={
            <PublicRoute user={user}>
              <SignupWrapper onSignup={signup} />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <HomepageWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/create" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <CreateWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/cookbooks" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <CookbooksPageWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/saved" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <SavedPostWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/explore" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <ExploreWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/notifications" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <NotificationWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/post/:id" 
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={logout}>
                <PostDetailWrapper user={user} onLogout={logout} />
              </Layout>
            </PrivateRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}