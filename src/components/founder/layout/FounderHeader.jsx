import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthService from "../../../services/AuthService";
import { FaRocket, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./FounderHeader.css";

export default function FounderHeader() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    async function logout() {
        try {
            await AuthService.logout();
            closeMenu();
            navigate("/login");
        } catch (error) {
            console.error("Founder logout error:", error);
        }
    }

    return (
        <header className="founder-header">
            <nav className="founder-navbar">
                <div className="founder-navbar-inner">
                    <NavLink
                        to="/founder"
                        end
                        className="founder-brand"
                        onClick={closeMenu}
                    >
                        <span className="founder-brand-icon">
                            <FaRocket />
                        </span>
                        <span>StartupHub Founder</span>
                    </NavLink>

                    <button
                        type="button"
                        className="founder-menu-toggle"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle founder navigation"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <div
                        className={`founder-nav-content ${menuOpen ? "show" : ""}`}
                    >
                        <div className="founder-nav-links">
                            <NavLink
                                to="/founder"
                                end
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `founder-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/founder/business"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `founder-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Business
                            </NavLink>

                            <NavLink
                                to="/founder/projects"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `founder-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Projects
                            </NavLink>

                            <NavLink
                                to="/founder/applications"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `founder-nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Applications
                            </NavLink>
                        </div>

                        <button
                            type="button"
                            className="founder-logout-btn"
                            onClick={logout}
                        >
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
