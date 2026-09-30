import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import { FaRocket } from "react-icons/fa";

export default function FounderHeader() {

    const navigate = useNavigate();

    async function logout() {

        await AuthService.logout();
        navigate("/login");
    }

    return (

        <nav className="navbar navbar-expand-lg user-navbar fixed-top">

            <div className="container-fluid">

                <NavLink
                    to="/founder"
                    className="navbar-brand user-logo"
                >
                    <FaRocket className="me-2" />
                    StartupHub Founder
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#founderNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="founderNavbar"
                >
                    <div className="navbar-nav mx-auto">

                        <NavLink
                            to="/founder"
                            end
                            className="nav-link"
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/founder/business"
                            className="nav-link"
                        >
                            Business
                        </NavLink>

                        <NavLink
                            to="/founder/projects"
                            className="nav-link"
                        >
                            Projects
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