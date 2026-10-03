import { NavLink, useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { useState } from "react";
import AuthService from "../../../services/AuthService";
import "../styles/header.css";

export default function Header() {

    const navigate = useNavigate();
    const user = AuthService.getUser();

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    async function handleLogout() {

        try {

            await AuthService.logout();

            closeMenu();

            navigate("/");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <header className="user-header">

            <nav className="navbar navbar-expand-lg user-navbar">

                <div className="container-fluid user-navbar-container">

                    {/* =========================================
                        LOGO
                    ========================================= */}

                    <NavLink
                        to="/"
                        className="navbar-brand user-logo"
                        onClick={closeMenu}
                    >

                        <FaRocket />

                        <span>StartupHub</span>

                    </NavLink>


                    {/* =========================================
                        MOBILE TOGGLE
                    ========================================= */}

                    <button
                        className="navbar-toggler user-navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>


                    {/* =========================================
                        NAVIGATION
                    ========================================= */}

                    <div
                        className={
                            `collapse navbar-collapse ${
                                menuOpen ? "show" : ""
                            }`
                        }
                    >

                        {/* CENTER MENU */}

                        <div className="navbar-nav user-nav-menu">

                            <NavLink
                                to="/"
                                end
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Home
                            </NavLink>


                            <NavLink
                                to="/about"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                About
                            </NavLink>


                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Contact
                            </NavLink>


                            <NavLink
                                to="/marketplace"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Marketplace
                            </NavLink>

                        </div>


                        {/* =========================================
                            AUTH BUTTONS
                        ========================================= */}

                        <div className="user-auth-buttons">

                            {user ? (

                                <button
                                    type="button"
                                    className="user-auth-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            ) : (

                                <>

                                    <NavLink
                                        to="/login"
                                        onClick={closeMenu}
                                        className="user-auth-btn"
                                    >
                                        Login
                                    </NavLink>


                                    <NavLink
                                        to="/register"
                                        onClick={closeMenu}
                                        className="user-auth-btn"
                                    >
                                        Register
                                    </NavLink>

                                </>

                            )}

                        </div>

                    </div>

                </div>

            </nav>

        </header>

    );
}