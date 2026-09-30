import { NavLink } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import "../styles/adminHeader.css";


export default function AdminHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
        <div className="container-fluid px-4">

          {/* Logo */}
          <NavLink to="/admin" className="navbar-brand fw-bold">
            <FaRocket className="me-2 text-info" />
            StartupHub Admin
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="adminNavbar">
            <div className="navbar-nav ms-auto">

              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/categories"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Category
              </NavLink>

              <NavLink
                to="/admin/startups"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Startups
              </NavLink>

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Users
              </NavLink>

             

              <NavLink
                to="/"
                className="view-btn"
              >
                View Website
              </NavLink>

              <NavLink
                to="/login"
                className="view-btn"
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