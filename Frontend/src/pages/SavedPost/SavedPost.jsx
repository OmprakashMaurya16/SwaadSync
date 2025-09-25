import React, { useEffect, useState } from "react";
import "./SavedPost.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";
import { cookbookAPI, recipeAPI } from "../../utils/api"; 

const SavedPost = ({ user, onLogout, onPostClick }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await cookbookAPI.getRecipes(); 
      if (response.data.success) {
        setSavedRecipes(response.data.recipes || []);
      }
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      setSavedRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = savedRecipes.filter(recipe =>
    recipe.name?.toLowerCase().includes(search.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="ss-loading">Loading saved recipes...</div>;

  return (
    <div className="ss-savedpost-root">
      <header className="ss-homepage-header">
        <div className="ss-homepage-searchbar">
          <span className="ss-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search saved recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="ss-homepage-header-right">
          <AccountDropdown user={user} onLogout={onLogout} />
        </div>
      </header>

      <div className="ss-savedpost-header">
        <h2>Saved Recipes ({savedRecipes.length})</h2>
        <p>Your personal collection of favorite recipes</p>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="ss-empty-saved">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
            <h3>No saved recipes yet</h3>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
              Start saving your favorite recipes to see them here!
            </p>
          </div>
        </div>
      ) : (
        <div className="ss-savedpost-grid">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe._id}
              className="ss-savedpost-card"
              onClick={() => onPostClick(recipe)}
            >
              <img 
                src={recipe.images?.[0]?.url || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80"} 
                alt={recipe.name}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80";
                }}
              />
              <div className="ss-savedpost-card-content">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <div className="ss-savedpost-card-meta">
                  <span>By {recipe.owner?.name || "Unknown Chef"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPost;