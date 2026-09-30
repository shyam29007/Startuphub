import { NavLink, useNavigate } from "react-router-dom";
import { FaCode } from "react-icons/fa";

import AuthService from "../../../services/AuthService";

export default function DeveloperHeader() {

    const navigate = useNavigate();

    async function logout() {

        await AuthService.logout();

        localStorage.removeItem("user");

        navigate("/login");

    }

    return (

        <nav className="navbar navbar-expand-lg user-navbar fixed-top">

            <div className="container-fluid">

                <NavLink
                    to="/developer"
                    className="navbar-brand user-logo"
                >
                    <FaCode className="me-2" />
                    StartupHub 
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#developerNavbar"
                    aria-controls="developerNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="developerNavbar"
                >

                    <div className="navbar-nav mx-auto">

                        <NavLink
                            to="/developer"
                            end
                            className="nav-link"
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/developer/projects"
                            className="nav-link"
                        >
                            Browse Projects
                        </NavLink>

                        <NavLink
                            to="/developer/applications"
                            className="nav-link"
                        >
                            My Applications
                        </NavLink>

                    </div>

                    <button
                        className="btn user-login-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}