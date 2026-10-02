import { NavLink, useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { useState } from "react";
import AuthService from "../../../services/AuthService";
import "../styles/header.css";

export default function Header() {

    const navigate = useNavigate();

    const user = AuthService.getUser();

    // Mobile menu state
    const [menuOpen, setMenuOpen] = useState(false);

    // Close mobile menu
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

        <header>

            <nav className="navbar navbar-expand-lg user-navbar fixed-top">

                <div className="container-fluid px-4">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="navbar-brand user-logo"
                        onClick={closeMenu}
                    >
                        <FaRocket className="me-2" />
                        StartupHub
                    </NavLink>


                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    {/* Navigation Menu */}
                    <div
                        className={`collapse navbar-collapse ${
                            menuOpen ? "show" : ""
                        }`}
                        id="navbarCollapse"
                    >

                        {/* Center Menu */}
                        <div className="navbar-nav mx-auto">

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


                        {/* Authentication Buttons */}

                        {
                            user ? (

                                <button
                                    className="btn user-login-btn ms-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            ) : (

                                <>

                                    <NavLink
                                        to="/login"
                                        onClick={closeMenu}
                                        className="btn user-login-btn me-2"
                                    >
                                        Login
                                    </NavLink>


                                    <NavLink
                                        to="/register"
                                        onClick={closeMenu}
                                        className="btn user-login-btn"
                                    >
                                        Register
                                    </NavLink>

                                </>

                            )
                        }

                    </div>

                </div>

            </nav>

        </header>
    );
}