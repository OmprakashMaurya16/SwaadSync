// Homepage.jsx
import React, { useEffect, useState } from "react";
import "./Homepage.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";
import { recipeAPI } from "../../utils/api";

const categories = [
  "All",
  "Indian",
  "Italian",
  "Desserts",
  "Snacks",
  "Healthy",
  "Vegan",
  "Quick Meals",
  "Chinese",
  "Mexican",
  "Japanese",
];

const Homepage = ({ user, onLogout, onPostClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [selectedCategory, searchQuery, recipes]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getAll();
      if (response.data.success) {
        setRecipes(response.data.recipes);
      }
    } catch (err) {
      setError("Failed to load recipes");
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let filtered = recipes;

    // Filter by category
    if (selectedCategory !== "All") {
      const categoryLower = selectedCategory.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.tags?.some(
            (tag) =>
              tag.toLowerCase().includes(categoryLower) ||
              categoryLower.includes(tag.toLowerCase())
          ) ||
          recipe.filters?.some(
            (filter) =>
              filter.toLowerCase().includes(categoryLower) ||
              categoryLower.includes(filter.toLowerCase())
          ) ||
          recipe.cuisine?.toLowerCase().includes(categoryLower) ||
          recipe.category?.toLowerCase().includes(categoryLower) ||
          recipe.name?.toLowerCase().includes(categoryLower) ||
          recipe.description?.toLowerCase().includes(categoryLower)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (recipe) =>
          recipe.name?.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.ingredients?.some((ingredient) => {
            const ingredientText =
              typeof ingredient === "string"
                ? ingredient
                : ingredient.name || ingredient.text || "";
            return ingredientText.toLowerCase().includes(query);
          }) ||
          recipe.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          recipe.cuisine?.toLowerCase().includes(query) ||
          recipe.category?.toLowerCase().includes(query)
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="ss-homepage-root">
        <div className="ss-loading">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="ss-homepage-root">
      <header className="ss-homepage-header">
        <span className="ss-search-icon">🔍</span>
        <input
          className="ss-search-input"
          type="text"
          placeholder="Search recipes, ingredients, cuisines..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            type="button"
            className="ss-search-clear"
            onClick={handleSearchClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        <div className="ss-homepage-header-right">
          <div className="ss-streak">
            <span className="ss-chef-hat">
              <img
                src="/assets/chef-hat.png"
                alt="Streaks"
                className="ss-chef-hat-img"
              />
              <span className="ss-streak-tooltip">Streaks</span>
            </span>
            <span className="ss-streak-count ss-streak-count-right">0</span>
          </div>
          <AccountDropdown user={user} onLogout={onLogout} />
        </div>
      </header>

      <nav className="ss-homepage-categories">
        {categories.map((category) => (
          <span
            key={category}
            className={`ss-category ${
              selectedCategory === category ? "ss-category-active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      </nav>

      <main className="ss-homepage-masonry">
        {error && <div className="ss-error">{error}</div>}

        {filteredRecipes.length === 0 && !loading ? (
          <div className="ss-empty">
            {searchQuery
              ? `No recipes found for "${searchQuery}"`
              : `No recipes found in ${selectedCategory} category`}
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="ss-dish-card"
              onClick={() => onPostClick(recipe)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  recipe.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80"
                }
                alt={recipe.name}
                className="ss-dish-img"
                style={{
                  height: Math.floor(Math.random() * 200) + 200,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="ss-dish-title">{recipe.name}</div>
              <div className="ss-dish-description">{recipe.description}</div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Homepage;
