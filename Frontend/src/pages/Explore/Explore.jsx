import React, { useEffect, useState } from "react";
import "./Explore.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";
import { useNavigate } from "react-router-dom";

const cuisines = [
  { name: "Italian", img: "/assets/cuisines/italian.jpg" },
  { name: "Indian", img: "/assets/cuisines/indian.jpg" },
  { name: "Chinese", img: "/assets/cuisines/chinese.jpg" },
  { name: "Mexican", img: "/assets/cuisines/mexican.jpg" },
  { name: "French", img: "/assets/cuisines/french.jpg" },
  { name: "Thai", img: "/assets/cuisines/thai.jpg" },
  { name: "Japanese", img: "/assets/cuisines/japanese.jpg" },
  { name: "Mediterranean", img: "/assets/cuisines/mediterranean.jpg" },
  // Add more cuisines and images as needed
];

const Explore = ({ user, onLogout }) => {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = "/recipes";
        if (selectedCuisine) {
          url += `?cuisine=${selectedCuisine}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setRecipes(data.recipes);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [selectedCuisine]);

  return (
    <div className="ss-explore-root">
      <header className="ss-homepage-header">
        <div className="ss-homepage-searchbar">
          <span className="ss-search-icon">🔍</span>
          <input
            className="ss-search-input"
            type="text"
            placeholder="Search recipes, ingredients, cuisines..."
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
      <div className="ss-explore-header">
        <h2>Explore Cuisines</h2>
      </div>
      <div className="ss-explore-filters">
        {cuisines.map((cuisine) => (
          <div
            key={cuisine.name}
            className={`ss-explore-cuisine-card${selectedCuisine === cuisine.name ? " ss-explore-cuisine-active" : ""}`}
            onClick={() => setSelectedCuisine(cuisine.name)}
          >
            <img src={cuisine.img} alt={cuisine.name} className="ss-explore-cuisine-img" />
            <span>{cuisine.name}</span>
          </div>
        ))}
        <div
          className={`ss-explore-cuisine-card${selectedCuisine === "" ? " ss-explore-cuisine-active" : ""}`}
          onClick={() => setSelectedCuisine("")}
        >
          <span>All</span>
        </div>
      </div>
      <div className="ss-explore-content">
        {loading ? (
          <div className="ss-explore-loading">Loading...</div>
        ) : recipes.length === 0 ? (
          <div className="ss-explore-empty">No recipes found.</div>
        ) : (
          <div className="ss-explore-list">
            {recipes.map((recipe) => (
              <div
                className="ss-explore-recipe-card"
                key={recipe._id}
                onClick={() => navigate(`/post/${recipe._id}`)}
                style={{ cursor: "pointer" }}
              >
                {recipe.images && recipe.images[0] && (
                  <img src={recipe.images[0].url} alt={recipe.name} className="ss-explore-recipe-img" />
                )}
                <div className="ss-explore-recipe-title">{recipe.name}</div>
                <div className="ss-explore-recipe-desc">{recipe.description}</div>
                <div className="ss-explore-recipe-cuisine">Cuisine: {recipe.cuisine || "Unknown"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
