import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

// Use SVG icons for black color
function getIconColor(isDark) {
  return isDark ? "#FFAF45" : "#111";
}

const navItems = [
  {
    label: "Explore",
    to: "/explore",
    icon: (color) => (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    label: "Create",
    to: "/create",
    icon: (color) => (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    label: "Cookbooks",
    to: "/cookbooks",
    icon: (color) => (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
      </svg>
    ),
  },
  {
    label: "Saved",
    to: "/saved",
    icon: (color) => (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    to: "/notifications",
    icon: (color) => (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

function Navbar() {
  const [isDark, setIsDark] = React.useState(
    typeof window !== "undefined" && document.body.classList.contains("ss-dark")
  );

  React.useEffect(() => {
    const handler = () =>
      setIsDark(document.body.classList.contains("ss-dark"));
    window.addEventListener("ss-theme", handler);
    return () => window.removeEventListener("ss-theme", handler);
  }, []);

  const iconColor = getIconColor(isDark);
  return (
    <nav className="ss-navbar">
      <Link to="/" className="ss-navbar-logo">
        {/* Place SwaadSync logo here */}
      </Link>
      <ul className="ss-navbar-list">
        {navItems.map((item) => (
          <li key={item.label} className="ss-navbar-item">
            <Link to={item.to} className="ss-navbar-link">
              <span className="ss-navbar-icon">{item.icon(iconColor)}</span>
              <span className="ss-navbar-label ss-navbar-label-hover">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SettingsDropdown isDark={isDark} setIsDark={setIsDark} />
    </nav>
  );
}

// SettingsDropdown component
function SettingsDropdown({ isDark, setIsDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Update theme and fire event for Navbar to listen
  const handleThemeChange = (checked) => {
    if (checked) {
      document.body.classList.add("ss-dark");
    } else {
      document.body.classList.remove("ss-dark");
    }
    window.dispatchEvent(new Event("ss-theme"));
    setIsDark(checked);
  };

  const iconColor = getIconColor(isDark);

  return (
    <div className="ss-navbar-bottom ss-settings-dropdown" ref={ref}>
      <span
        className="ss-navbar-icon"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
        style={{ cursor: "pointer" }}
      >
        {/* FontAwesome style gear icon */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.69-.98l-.38-2.65A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.03 7.03 0 0 0-1.69.98l-2.49-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.38 1.08.72 1.69.98l.38 2.65A.5.5 0 0 0 10 22h4a.5.5 0 0 0 .5-.42l.38-2.65c.61-.26 1.17-.6 1.69-.98l2.49 1a.5.5 0 0 0 .61-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65z" />
        </svg>
      </span>
      <span className="ss-navbar-label ss-navbar-label-hover">Settings</span>
      {open && (
        <div className="ss-settings-menu ss-settings-menu-open">
          <label className="ss-theme-switch">
            <input
              type="checkbox"
              onChange={(e) => handleThemeChange(e.target.checked)}
              checked={isDark}
            />
            <span className="ss-slider"></span>
            <span className="ss-theme-label">
              {isDark ? "Dark" : "Light"} Mode
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Navbar;
