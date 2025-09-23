import React, { useState } from "react";
import "./CookbooksPage.css";

// Dummy cookbook data
const dummyCookbooks = [
  {
    id: 1,
    title: "Indian Classics",
    pinCount: 45,
    timeAgo: "3d",
    images: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1574653802931-3bf2b3c8d8bb?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 2,
    title: "Quick Breakfast",
    pinCount: 28,
    timeAgo: "1w",
    images: [
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 3,
    title: "Desserts",
    pinCount: 62,
    timeAgo: "2w",
    images: [
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 4,
    title: "Healthy Meals",
    pinCount: 34,
    timeAgo: "3w",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 5,
    title: "Street Food",
    pinCount: 51,
    timeAgo: "1m",
    images: [
      "https://images.unsplash.com/photo-1554978991-33ef7f31d658?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: 6,
    title: "Baking",
    pinCount: 39,
    timeAgo: "1m",
    images: [
      "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80"
    ]
  }
];

export default function CookbooksPage() {
  const [activeTab, setActiveTab] = useState("Pins");
  const [viewMode, setViewMode] = useState("all"); // all, group, archived

  return (
    <div className="ss-cookbooks-root">
      <div className="ss-cookbooks-header">
        <div className="ss-cookbooks-left">
          <h1>Your saved ideas</h1>
        </div>
        <div className="ss-cookbooks-right">
          <div className="ss-user-info">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Asm&size=64" 
              alt="Asm" 
              className="ss-user-avatar"
            />
            <div className="ss-user-details">
              <h3>Asm</h3>
              <p>1 follower • 1 following</p>
            </div>
          </div>
          <button className="ss-view-profile-btn">View profile</button>
        </div>
      </div>

      <div className="ss-cookbooks-tabs">
        <span 
          className={`ss-cookbooks-tab ${activeTab === "Pins" ? "ss-cookbooks-tab-active" : ""}`}
          onClick={() => setActiveTab("Pins")}
        >
          Pins
        </span>
        <span 
          className={`ss-cookbooks-tab ${activeTab === "Boards" ? "ss-cookbooks-tab-active" : ""}`}
          onClick={() => setActiveTab("Boards")}
        >
          Boards
        </span>
        <span 
          className={`ss-cookbooks-tab ${activeTab === "Collages" ? "ss-cookbooks-tab-active" : ""}`}
          onClick={() => setActiveTab("Collages")}
        >
          Collages
        </span>
      </div>

      <div className="ss-cookbooks-actions">
        <div className="ss-filter-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
        <span 
          className={`ss-filter-btn ${viewMode === "all" ? "ss-filter-active" : ""}`}
          onClick={() => setViewMode("all")}
        >
          Group
        </span>
        <span 
          className={`ss-filter-btn ${viewMode === "archived" ? "ss-filter-active" : ""}`}
          onClick={() => setViewMode("archived")}
        >
          Archived
        </span>
        <div className="ss-cookbooks-actions-right">
          <button className="ss-create-btn">Create</button>
        </div>
      </div>

      <div className="ss-cookbooks-grid">
        {dummyCookbooks.map((cookbook) => (
          <div className="ss-cookbook-board" key={cookbook.id}>
            <div className="ss-cookbook-images">
              {cookbook.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`ss-cookbook-image ss-cookbook-image-${index + 1}`}
                />
              ))}
            </div>
            <div className="ss-cookbook-info">
              <h3 className="ss-cookbook-title">{cookbook.title}</h3>
              <p className="ss-cookbook-meta">{cookbook.pinCount} Pins • {cookbook.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
