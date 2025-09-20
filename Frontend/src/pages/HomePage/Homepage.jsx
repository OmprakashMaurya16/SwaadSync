
import React from "react";
import "./Homepage.css";
import AccountDropdown from "../../components/AccountDropdown/AccountDropdown";

const sampleDishes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    height: 320,
  },
  {
    id: 2,
    title: "Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    height: 220,
  },
  {
    id: 3,
    title: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    height: 400,
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    height: 260,
  },
  {
    id: 5,
    title: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
    height: 350,
  },
  {
    id: 6,
    title: "Dosa with Chutney",
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
    height: 180,
  },
  {
    id: 7,
    title: "Ramen Bowl",
    image: "https://images.unsplash.com/photo-1504674900247-ec6b0b1b798e?auto=format&fit=crop&w=400&q=80",
    height: 270,
  },
  {
    id: 8,
    title: "Falafel Wrap",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    height: 340,
  },
  {
    id: 9,
    title: "Berry Pancakes",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    height: 210,
  },
  {
    id: 10,
    title: "Tandoori Chicken",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    height: 390,
  },
];

const Homepage = ({ user, onLogout }) => {
  return (
    <div className="ss-homepage-root">
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
      <nav className="ss-homepage-categories">
        <span className="ss-category ss-category-active">All</span>
        <span className="ss-category">Indian</span>
        <span className="ss-category">Italian</span>
        <span className="ss-category">Desserts</span>
        <span className="ss-category">Snacks</span>
        <span className="ss-category">Healthy</span>
        <span className="ss-category">Vegan</span>
        <span className="ss-category">Quick Meals</span>
        <span className="ss-category">More</span>
      </nav>
      <main className="ss-homepage-masonry">
        {sampleDishes.map((dish) => (
          <a href={`/post/${dish.id}`} key={dish.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ss-dish-card">
              <img
                src={dish.image}
                alt={dish.title}
                className="ss-dish-img"
                style={{ height: dish.height, width: "100%", objectFit: "cover" }}
              />
              <div className="ss-dish-title">{dish.title}</div>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
};

export default Homepage;
