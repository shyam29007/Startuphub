import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import "../styles/adminHeader.css";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm">
        <div className="container-fluid px-4">

          {/* Logo */}
          <NavLink
            to="/admin"
            className="navbar-brand fw-bold"
            onClick={closeMenu}
          >
            <FaRocket className="me-2 text-info" />
            StartupHub Admin
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="adminNavbar"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse ${
              menuOpen ? "show" : ""
            }`}
            id="adminNavbar"
          >
            <div className="navbar-nav ms-auto">

              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/categories"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                Category
              </NavLink>

              <NavLink
                to="/admin/startups"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                Startups
              </NavLink>

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                Users
              </NavLink>

              <NavLink
                to="/"
                className="view-btn"
                onClick={closeMenu}
              >
                View Website
              </NavLink>

              <NavLink
                to="/login"
                className="view-btn logout-btn"
                onClick={closeMenu}
              >
                Logout
              </NavLink>

            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}