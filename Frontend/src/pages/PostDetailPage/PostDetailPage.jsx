import React, { useState, useEffect } from "react";
import "./PostDetailPage.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";
import { recipeAPI, reviewAPI, cookbookAPI } from "../../utils/api";

const PostDetailPage = ({ postId, user, onLogout, onBack, onPostClick }) => {
 const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchRecipeData();
    fetchRecommendedRecipes();
  }, [postId]);

  const fetchRecipeData = async () => {
    try {
      setLoading(true);
      const [recipeResponse, reviewsResponse] = await Promise.all([
        recipeAPI.getById(postId),
        reviewAPI.getByRecipe(postId)
      ]);

      if (recipeResponse.data.success) {
        const recipeData = recipeResponse.data.recipe;
        setRecipe(recipeData);
        setLikes(recipeData.likes || 0);
        setIsLiked(recipeData.isLiked || false);
        await checkIfRecipeSaved();

      }

      if (reviewsResponse.data.success) {
        setReviews(reviewsResponse.data.reviews);
      }

      // Check if recipe is saved in cookbook
      const cookbookResponse = await cookbookAPI.getRecipes();
      if (cookbookResponse.data.success) {
        const savedRecipeIds = cookbookResponse.data.recipes.map(r => r._id);
        setIsSaved(savedRecipeIds.includes(postId));
      }
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    } finally {
      setLoading(false);
    }
  };


    const checkIfRecipeSaved = async () => {
    try {
      const cookbookResponse = await cookbookAPI.getRecipes();
      if (cookbookResponse.data.success) {
        const savedRecipeIds = cookbookResponse.data.recipes.map(r => r._id);
        setIsSaved(savedRecipeIds.includes(postId));
      }
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const fetchRecommendedRecipes = async () => {
    try {
      const response = await recipeAPI.getAll();
      if (response.data.success) {
        // Filter out current recipe and get 6 random recipes
        const filtered = response.data.recipes
          .filter(recipe => recipe._id !== postId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setRecommendedRecipes(filtered);
      }
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
    }
  };

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikes(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      if (isSaved) {
        await cookbookAPI.removeRecipe(postId);
        console.log("Recipe removed from cookbook");
      } else {
        await cookbookAPI.addRecipe(postId);
        console.log("Recipe added to cookbook");
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error saving recipe. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await reviewAPI.create(postId, {
        comment: newComment,
        rating: 5 
      });

      if (response.data.success) {
        setReviews([response.data.review, ...reviews]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRecommendationClick = (recipe) => {
    if (onPostClick) {
      onPostClick(recipe);
    }
  };

  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80";
  };

  const formatIngredients = (ingredients) => {
    if (!ingredients) return [];
    
    return ingredients.map(ingredient => {
      if (typeof ingredient === 'string') {
        return { name: ingredient, quantity: '', unit: '' };
      }
      return {
        name: ingredient.name || ingredient.text || '',
        quantity: ingredient.quantity || '',
        unit: ingredient.unit || ''
      };
    });
  };

  if (loading) {
    return (
      <div className="ss-post-detail-root">
        <div className="ss-loading">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🍳</div>
            <div>Loading delicious recipe...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="ss-post-detail-root">
        <div className="ss-error">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
            <div>Recipe not found</div>
            <button 
              onClick={onBack}
              style={{
                marginTop: '1rem',
                padding: '10px 20px',
                background: '#FFAF45',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formattedIngredients = formatIngredients(recipe.ingredients);

  return (
    <div className="ss-post-detail-root">
      {/* Header */}
      <header className="ss-post-detail-header">
        <div className="ss-post-detail-header-left">
          <button className="ss-post-detail-back" onClick={onBack}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="ss-post-detail-searchbar">
            <svg className="ss-search-icon" width="20" height="20" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input className="ss-search-input" type="text" placeholder="Search recipes..." />
          </div>
        </div>
        <div className="ss-post-detail-header-right">
          <AccountDropdown user={user} onLogout={onLogout} />
        </div>
      </header>

      {/* Main content */}
      <div className="ss-post-detail-content">
        <div className="ss-post-detail-left">
          {/* Image Section */}
          <div className="ss-post-detail-image-section">
            <div className="ss-post-detail-image-container">
              <img
                src={imageError ? getDefaultImage() : (recipe.images?.[0]?.url || getDefaultImage())}
                alt={recipe.name}
                className="ss-post-detail-image"
                onError={handleImageError}
              />
              <div className="ss-post-detail-actions">
                <button className={`ss-post-action-btn ${isLiked ? "ss-action-liked" : ""}`} onClick={handleLike}>
                  <svg width="24" height="24" fill={isLiked ? "#e60023" : "none"} stroke={isLiked ? "#e60023" : "currentColor"}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {likes}
                </button>
                <button className={`ss-save-btn ${isSaved ? "ss-save-saved" : ""}`} onClick={handleSave}>
                  {isSaved ? "✓ Saved" : "Save Recipe"}
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="ss-post-detail-info">
            <div className="ss-post-detail-category">
              <span className="ss-category-tag">
                {recipe.cuisine || recipe.category || "Recipe"}
              </span>
            </div>
            
            <h1 className="ss-post-detail-title">{recipe.name}</h1>
            <p className="ss-post-detail-description">{recipe.description}</p>

            {/* User Info */}
            <div className="ss-post-detail-user">
              <img
                src={recipe.author?.avatar || "/assets/default-avatar.png"}
                alt={recipe.author?.name}
                className="ss-post-user-avatar"
              />
              <div>
                <div className="ss-post-username">{recipe.owner?.name || "Unknown Chef"}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {recipe.cookingTime || "30 mins"} • {recipe.servings || "4 servings"}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="ss-recipe-section">
              <h3>Ingredients</h3>
              <ul className="ss-ingredients-list">
                {formattedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity && `${ingredient.quantity} `}
                    {ingredient.unit && `${ingredient.unit} `}
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="ss-recipe-section">
              <h3>Instructions</h3>
              <div className="ss-recipe-instructions">
                {recipe.instructions || "No instructions provided."}
              </div>
            </div>

            {/* Reviews */}
            <div className="ss-post-comments">
              <h3>Reviews ({reviews.length})</h3>
              <form onSubmit={handleAddComment} className="ss-comment-form">
                <input
                  type="text"
                  placeholder="Share your thoughts about this recipe..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="ss-comment-input"
                />
                <button type="submit" className="ss-comment-submit">Post</button>
              </form>
              <div className="ss-comments-list">
                {reviews.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', opacity: 0.7 }}>
                    No reviews yet. Be the first to share your thoughts!
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="ss-comment">
                      <div className="ss-comment-header">
                        <span className="ss-comment-username">{review.author?.name || "Anonymous"}</span>
                        <span className="ss-comment-rating">⭐ {review.rating}/5</span>
                      </div>
                      <p className="ss-comment-text">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended recipes */}
        <div className="ss-post-detail-right">
          <h3 className="ss-recommendations-title">More Recipes You'll Love</h3>
          <div className="ss-recommendations-grid">
            {recommendedRecipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="ss-recommendation-card"
                onClick={() => handleRecommendationClick(recipe)}
              >
                <div className="ss-recommendation-img-container">
                  <img
                    src={recipe.images?.[0]?.url || getDefaultImage()}
                    alt={recipe.name}
                    className="ss-recommendation-img"
                    onError={(e) => {
                      e.target.src = getDefaultImage();
                    }}
                  />
                </div>
                <div className="ss-recommendation-overlay">
                  <div className="ss-recommendation-title">{recipe.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;