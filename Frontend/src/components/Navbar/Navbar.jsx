
import React from "react";
import "./Navbar.css";


const navItems = [
  { label: "Explore", icon: "\ud83d\udd0d" },
  { label: "Create", icon: "\u2795" },
  { label: "Cookbooks", icon: "\ud83d\udcd6" },
  { label: "Saved", icon: "\ud83d\udcbe" },
  { label: "Notifications", icon: "\ud83d\udd14" },
];

const Navbar = () => {
  return (
    <nav className="ss-navbar">
      <div className="ss-navbar-logo">
        {/* Place SwaadSync logo here */}
      </div>
      <ul className="ss-navbar-list">
        {navItems.map((item) => (
          <li key={item.label} className="ss-navbar-item">
            <span className="ss-navbar-icon">{item.icon}</span>
            <span className="ss-navbar-label ss-navbar-label-hover">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="ss-navbar-bottom">
        <span className="ss-navbar-icon">&#9881;</span>
        <span className="ss-navbar-label ss-navbar-label-hover">Settings</span>
      </div>
    </nav>
  );
};

export default Navbar;
