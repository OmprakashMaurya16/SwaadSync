
import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";


// Use SVG icons for black color
function getIconColor(isDark) {
  return isDark ? '#FFAF45' : '#111';
}

const navItems = [
  { label: "Explore", icon: (color) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { label: "Create", icon: (color) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { label: "Cookbooks", icon: (color) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg> },
  { label: "Saved", icon: (color) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> },
  { label: "Notifications", icon: (color) => <svg width="24" height="24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
];



function Navbar() {
  const [isDark, setIsDark] = React.useState(
    typeof window !== 'undefined' && document.body.classList.contains('ss-dark')
  );

  React.useEffect(() => {
    const handler = () => setIsDark(document.body.classList.contains('ss-dark'));
    window.addEventListener('ss-theme', handler);
    return () => window.removeEventListener('ss-theme', handler);
  }, []);

  const iconColor = getIconColor(isDark);
  return (
    <nav className="ss-navbar">
      <div className="ss-navbar-logo">
        {/* Place SwaadSync logo here */}
      </div>
      <ul className="ss-navbar-list">
        {navItems.map((item) => (
          <li key={item.label} className="ss-navbar-item">
            <span className="ss-navbar-icon">{item.icon(iconColor)}</span>
            <span className="ss-navbar-label ss-navbar-label-hover">{item.label}</span>
          </li>
        ))}
      </ul>
      <SettingsDropdown isDark={isDark} setIsDark={setIsDark} />
    </nav>
  );
}

export default Navbar;

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
      document.body.classList.add('ss-dark');
    } else {
      document.body.classList.remove('ss-dark');
    }
    window.dispatchEvent(new Event('ss-theme'));
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
        <svg width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1V13a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 8.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.42 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.24.59.24 1.25 0 1.84z"/></svg>
      </span>
      <span className="ss-navbar-label ss-navbar-label-hover">Settings</span>
      {open && (
        <div className="ss-settings-menu ss-settings-menu-open">
          <label className="ss-theme-switch">
            <input
              type="checkbox"
              onChange={e => handleThemeChange(e.target.checked)}
              checked={isDark}
            />
            <span className="ss-slider"></span>
            <span className="ss-theme-label">{isDark ? 'Dark' : 'Light'} Mode</span>
          </label>
        </div>
      )}
    </div>
  );
}

