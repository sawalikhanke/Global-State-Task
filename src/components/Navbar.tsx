// src/components/Navbar.tsx
import React from "react";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

export const Navbar = () => {
  const { user, logout } = useUser();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          🚀 Task-Management
        </a>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={toggleTheme}
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>

          {user && (
            <>
              <span className="me-2">Hi, {user.name}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
