import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRocket, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import AuthService from "../../../services/AuthService";
import "./DeveloperHeader.css";

export default function DeveloperHeader() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    async function logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("user");
            closeMenu();
            navigate("/login");
        } catch (error) {
            console.error("Developer logout error:", error);
        }
    }

    const navClass = ({ isActive }) => `developer-nav-link${isActive ? " active" : ""}`;

    return (
        <header className="developer-header">
            <nav className="developer-navbar">
                <div className="developer-navbar-inner">
                    <NavLink to="/developer" end className="developer-brand" onClick={closeMenu}>
                        <span className="developer-brand-icon"><FaRocket /></span>
                        <span>StartupHub Developer</span>
                    </NavLink>
                    <button type="button" className="developer-menu-toggle"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-controls="developerNavbar" aria-expanded={menuOpen}
                        aria-label="Toggle developer navigation">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className={`developer-nav-content${menuOpen ? " show" : ""}`} id="developerNavbar">
                        <div className="developer-nav-links">
                            <NavLink to="/developer" end className={navClass} onClick={closeMenu}>Dashboard</NavLink>
                            <NavLink to="/developer/projects" className={navClass} onClick={closeMenu}>Browse Projects</NavLink>
                            <NavLink to="/developer/applications" className={navClass} onClick={closeMenu}>My Applications</NavLink>
                        </div>
                        <button type="button" className="developer-logout-btn" onClick={logout}>
                            <FaSignOutAlt aria-hidden="true" /><span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
