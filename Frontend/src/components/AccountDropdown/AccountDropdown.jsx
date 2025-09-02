import React, { useRef, useEffect, useState } from "react";
import "./AccountDropdown.css";

export default function AccountDropdown({ user, onLogout }) {
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

  return (
    <div className="ss-account-dropdown-root" ref={ref}>
      <div
        className="ss-profile"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        aria-label="Account"
        style={{ cursor: "pointer" }}
      >
        <img
          src={user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt="Profile"
          className="ss-profile-img"
        />
      </div>
      {open && (
        <div className="ss-account-dropdown-menu">
          <div className="ss-account-username">{user?.username}</div>
          <button className="ss-account-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
