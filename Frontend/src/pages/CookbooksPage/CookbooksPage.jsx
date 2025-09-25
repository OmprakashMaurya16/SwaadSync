import React, { useState, useEffect } from "react";
import "./CookbooksPage.css";
import CreateRecipeModal from "../../components/CreateRecipeModal/CreateRecipeModal";
import { cookbookAPI } from "../../utils/api";

const CookbooksPage = ({ user, onLogout, onPostClick }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCookbooks();
  }, []);

// In CookbooksPage.jsx - update the fetchCookbooks function:
const fetchCookbooks = async () => {
  try {
    const response = await cookbookAPI.getRecipes(); // This now points to /api/cookbook
    if (response.data.success) {
      // Group recipes by category/tags to create cookbooks
      const recipes = response.data.recipes;
      const cookbookMap = {};
      
      recipes.forEach(recipe => {
        recipe.tags?.forEach(tag => {
          if (!cookbookMap[tag]) {
            cookbookMap[tag] = {
              id: tag,
              title: tag.charAt(0).toUpperCase() + tag.slice(1),
              recipes: []
            };
          }
          cookbookMap[tag].recipes.push(recipe);
        });
      });

      setCookbooks(Object.values(cookbookMap));
    }
  } catch (error) {
    console.error("Error fetching cookbooks:", error);
  } finally {
    setLoading(false);
  }
};

  const handleRecipeCreated = () => {
    setShowCreate(false);
    fetchCookbooks(); // Refresh the list
  };

  if (loading) {
    return <div className="ss-cookbooks-loading">Loading cookbooks...</div>;
  }

  return (
    <div className="ss-cookbooks-root">
      <div className="ss-cookbooks-header">
        <h1>My Cookbooks</h1>
        <button className="ss-create-btn" onClick={() => setShowCreate(true)}>
          Create Recipe
        </button>
      </div>

      <div className="ss-cookbooks-grid">
        {cookbooks.map((cookbook) => (
          <div
            key={cookbook.id}
            className="ss-cookbook-board"
            onClick={() => cookbook.recipes[0] && onPostClick(cookbook.recipes[0])}
          >
            <div className="ss-cookbook-images">
              {cookbook.recipes.slice(0, 4).map((recipe, index) => (
                <img
                  key={recipe._id}
                  src={recipe.images?.[0]?.url || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&q=80"}
                  alt=""
                  className={`ss-cookbook-image ss-cookbook-image-${index + 1}`}
                />
              ))}
            </div>
            <div className="ss-cookbook-info">
              <h3 className="ss-cookbook-title">{cookbook.title}</h3>
              <p className="ss-cookbook-meta">{cookbook.recipes.length} Recipes</p>
            </div>
          </div>
        ))}
      </div>

      <CreateRecipeModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={handleRecipeCreated}
      />
    </div>
  );
};

export default CookbooksPage;