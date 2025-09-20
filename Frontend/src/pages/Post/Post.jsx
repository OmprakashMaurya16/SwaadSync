import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Post.css";

const Post = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let didTimeout = false;
    if (id === "1") {
      setRecipe({
        title: "Classic Margherita Pizza",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        cook: "Chef Mario",
        ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil", "Olive oil", "Salt"],
        instructions: "Spread tomato sauce on dough, add mozzarella, bake at 220°C for 12 min, top with basil and olive oil.",
      });
      setComments([
        { user: "Foodie123", text: "This pizza looks amazing!" },
        { user: "PizzaLover", text: "Tried it and loved it!" },
      ]);
      setLiked(false);
      setSaved(false);
      return;
    }
    // For other ids, fetch from backend, but fallback to loading if fetch fails
    const timeout = setTimeout(() => {
      didTimeout = true;
      if (!recipe) {
        setRecipe({
          title: "Post not found",
          imageUrl: "",
          cook: "",
          ingredients: [],
          instructions: "This post could not be loaded.",
        });
      }
    }, 7000); // 7 seconds fallback
    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!didTimeout && data && Object.keys(data).length > 0) {
          setRecipe(data);
        }
      })
      .catch(() => {});
    fetch(`/api/recipes/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (!didTimeout && data && data.length > 0) {
          setComments(data);
        }
      })
      .catch(() => {});
    fetch(`/api/recipes/${id}/status`)
      .then((res) => res.json())
      .then((data) => {
        if (!didTimeout && data) {
          setLiked(data.liked);
          setSaved(data.saved);
        }
      })
      .catch(() => {});
    return () => clearTimeout(timeout);
  }, [id]);

  const handleLike = () => {
    fetch(`/api/recipes/${id}/like`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setLiked(data.liked));
  };

  const handleSave = () => {
    fetch(`/api/recipes/${id}/save`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setSaved(data.saved));
  };

  const handleComment = (e) => {
    e.preventDefault();
    fetch(`/api/recipes/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    })
      .then((res) => res.json())
      .then((newComment) => {
        setComments([...comments, newComment]);
        setCommentText("");
      });
  };

  if (!recipe) return <div className="post-loading">Loading...</div>;

  return (
    <div className="post-page">
      <Navbar />
      <div className="post-container">
        <header className="post-header">
          <h1>{recipe.title}</h1>
        </header>
        <div className="post-main">
          <div className="post-image-section">
            <img src={recipe.imageUrl} alt={recipe.title} className="post-image" />
            <div className="post-actions">
              <button className={`like-btn${liked ? " liked" : ""}`} onClick={handleLike}>
                {liked ? "♥ Liked" : "♡ Like"}
              </button>
              <button className={`save-btn${saved ? " saved" : ""}`} onClick={handleSave}>
                {saved ? "★ Saved" : "☆ Save"}
              </button>
            </div>
            <div className="post-comments post-comments-image">
              <h2>Comments</h2>
              <form onSubmit={handleComment} className="comment-form">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit">Post</button>
              </form>
              <ul className="comments-list">
                {comments.map((c, idx) => (
                  <li key={idx}>
                    <span className="comment-user">{c.user}</span>: {c.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="post-details">
            <div className="post-cook">By <span>{recipe.cook}</span></div>
            <div className="post-section">
              <h2>Ingredients</h2>
              <div className="line"></div>
              <ul>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="post-section">
              <h2>Recipe</h2>
              <div className="line"></div>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
