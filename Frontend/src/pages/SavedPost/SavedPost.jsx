import React, { useEffect, useState } from "react";
import "./SavedPost.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";

const SavedPost = ({ user, onLogout }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/user/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setRecipes(data.recipes);
        }
      } catch (err) {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedRecipes();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="ss-savedpost-loading">Loading...</div>;

  return (
    <div className="ss-savedpost-root">
      <header className="ss-homepage-header">
        <div className="ss-homepage-searchbar">
          <span className="ss-search-icon">🔍</span>
          <input
            className="ss-search-input"
            type="text"
            placeholder="Search your saved post..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="ss-homepage-header-right">
          <div className="ss-streak">
            <span className="ss-chef-hat">
              <img src="/assets/chef-hat.png" alt="Streaks" className="ss-chef-hat-img" />
              <span className="ss-streak-tooltip">Streaks</span>
            </span>
            <span className="ss-streak-count ss-streak-count-right">0</span>
          </div>
          <AccountDropdown user={user} onLogout={onLogout} />
        </div>
      </header>
      <div className="ss-savedpost-header">
        <h2>Saved Recipes</h2>
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="ss-savedpost-empty">No saved recipes found.</div>
      ) : (
        <div className="ss-savedpost-list">
          {filteredRecipes.map((recipe) => (
            <div className="ss-savedpost-card" key={recipe._id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              {/* Add more recipe details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPost;