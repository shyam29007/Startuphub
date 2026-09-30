import { NavLink, useNavigate } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import AuthService from "../../../services/AuthService";
import "../styles/header.css";

export default function Header()
  {

    const navigate = useNavigate();

    const user = AuthService.getUser();

    async function handleLogout() {

    try {

        await AuthService.logout();

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
          <NavLink to="/" className="navbar-brand user-logo">
            <FaRocket className="me-2" />
            StartupHub
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">

            {/* Center Menu */}
            <div className="navbar-nav mx-auto">

              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Marketplace
              </NavLink>

            </div>

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
                            className="btn user-login-btn me-2"
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
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