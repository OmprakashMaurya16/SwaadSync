import React from "react";
import "./RecipeModal.css";

const RecipeModalHomepage = ({ dish, open, onClose, onLike, onSave, onComment, liked, saved, comments }) => {
  if (!open || !dish) return null;
  return (
    <div className="ss-modal-overlay" onClick={onClose}>
      <div className="ss-modal-content" onClick={e => e.stopPropagation()}>
        <button className="ss-modal-close" onClick={onClose}>×</button>
        <img src={dish.image} alt={dish.title} className="ss-modal-img" />
        <h2 className="ss-modal-title">{dish.title}</h2>
        <div className="ss-modal-actions">
          <button className={`ss-modal-btn${liked ? " liked" : ""}`} onClick={onLike}>
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
          <button className={`ss-modal-btn${saved ? " saved" : ""}`} onClick={onSave}>
            {saved ? "🔖 Saved" : "🔖 Save"}
          </button>
          <button className="ss-modal-btn" onClick={onComment}>
            💬 Comment
          </button>
        </div>
        <div className="ss-modal-comments">
          <h3>Comments</h3>
          {comments && comments.length > 0 ? (
            <ul>
              {comments.map((c, idx) => (
                <li key={idx}><b>{c.user}</b>: {c.text}</li>
              ))}
            </ul>
          ) : (
            <div className="ss-modal-no-comments">No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModalHomepage;
