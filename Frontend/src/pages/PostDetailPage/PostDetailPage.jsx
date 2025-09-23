import React, { useState, useEffect } from "react";
import "./PostDetailPage.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";

// Dummy recommendations data
const recommendedPosts = [
  {
    id: 1,
    title: "Butter Chicken Recipe",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80",
    height: 280,
  },
  {
    id: 2,
    title: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80",
    height: 320,
  },
  {
    id: 3,
    title: "Biryani Bowl",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d25a?auto=format&fit=crop&w=400&q=80",
    height: 240,
  },
  {
    id: 4,
    title: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
    height: 300,
  },
  {
    id: 5,
    title: "Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80",
    height: 260,
  },
  {
    id: 6,
    title: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    height: 340,
  }
];

// Dummy comments data
const dummyComments = [
  {
    id: 1,
    user: { name: "priya_sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&size=32" },
    text: "This looks absolutely delicious! 😍 Can you share the recipe?",
    timeAgo: "2h",
    likes: 12
  },
  {
    id: 2,
    user: { name: "chef_rahul", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&size=32" },
    text: "Amazing presentation! The colors are so vibrant. What spices did you use?",
    timeAgo: "4h",
    likes: 8
  },
  {
    id: 3,
    user: { name: "foodie_maya", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya&size=32" },
    text: "I tried this recipe last week and it turned out great! Thanks for sharing 🙏",
    timeAgo: "1d",
    likes: 15
  }
];

export default function PostDetailPage({ post, onPostClick, user, onLogout, onBack }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(298);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(dummyComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: { name: "you", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you&size=32" },
        text: newComment,
        timeAgo: "now",
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  if (!post) return null;

  return (
    <div className="ss-post-detail-root">
      {/* Header */}
      <header className="ss-post-detail-header">
        <div className="ss-post-detail-header-left">
          <button className="ss-post-detail-back" onClick={onBack}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="ss-post-detail-searchbar">
            <svg className="ss-search-icon" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="ss-search-input"
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
            />
          </div>
        </div>
        <div className="ss-post-detail-header-right">
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

      {/* Main content */}
      <div className="ss-post-detail-content">
        {/* Left side - Post image, details and comments (scrollable) */}
        <div className="ss-post-detail-left">
          {/* Post image section */}
          <div className="ss-post-detail-image-section">
            <div className="ss-post-detail-image-container">
              <img 
                src={post.image || "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"} 
                alt={post.title || "Recipe"} 
                className="ss-post-detail-image"
              />
              <div className="ss-post-detail-actions">
                <button 
                  className={`ss-post-action-btn ${isLiked ? 'ss-action-liked' : ''}`}
                  onClick={handleLike}
                >
                  <svg width="24" height="24" fill={isLiked ? "#e60023" : "none"} stroke={isLiked ? "#e60023" : "currentColor"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {likes}
                </button>
                <button className="ss-post-action-btn">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button className="ss-post-action-btn" onClick={handleShare}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
                <button className="ss-post-action-btn ss-action-more">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Post details section */}
          <div className="ss-post-detail-info">
            <div className="ss-post-detail-header-section">
              <div className="ss-post-detail-category">
                <span className="ss-category-tag">{post.category || "couples"}</span>
                <button 
                  className={`ss-save-btn ${isSaved ? 'ss-save-saved' : ''}`}
                  onClick={handleSave}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <h1 className="ss-post-detail-title">{post.title || "Classic Margherita Pizza"}</h1>
            <p className="ss-post-detail-description">
              {post.description || "Stunning couple photography with perfect lighting and composition. This style captures the authentic emotions and connection between partners."}
            </p>

            {/* User info */}
            <div className="ss-post-detail-user">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=supriya&size=40" 
                alt="supriya" 
                className="ss-post-user-avatar"
              />
              <span className="ss-post-username">supriya</span>
            </div>

            {/* Comments section */}
            <div className="ss-post-comments">
              <h3>Comments</h3>
              <form onSubmit={handleAddComment} className="ss-comment-form">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="ss-comment-input"
                />
                <button type="submit" className="ss-comment-submit">Post</button>
              </form>
              <div className="ss-comments-list">
                {comments.map((comment) => (
                  <div key={comment.id} className="ss-comment">
                    <img src={comment.user.avatar} alt={comment.user.name} className="ss-comment-avatar" />
                    <div className="ss-comment-content">
                      <div className="ss-comment-header">
                        <span className="ss-comment-username">{comment.user.name}</span>
                        <span className="ss-comment-time">{comment.timeAgo}</span>
                      </div>
                      <p className="ss-comment-text">{comment.text}</p>
                      <button className="ss-comment-like">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        {comment.likes > 0 && comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Only recommendations */}
        <div className="ss-post-detail-right">
          <div className="ss-recommendations-section">
            <h3 className="ss-recommendations-title">More like this</h3>
            <div className="ss-recommendations-grid">
              {recommendedPosts.map((recPost) => (
                <div 
                  key={recPost.id} 
                  className="ss-recommendation-card"
                  onClick={() => onPostClick && onPostClick(recPost)}
                >
                  <img
                    src={recPost.image}
                    alt={recPost.title}
                    className="ss-recommendation-img"
                    style={{ height: recPost.height }}
                  />
                  <div className="ss-recommendation-overlay">
                    <span className="ss-recommendation-title">{recPost.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}