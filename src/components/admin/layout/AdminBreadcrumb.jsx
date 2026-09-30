import { Link, useLocation } from "react-router-dom";
import "../styles/AdminBreadcrumb.css";
import breadcrumbImg from "../../../assets/hero.png";

export default function AdminBreadcrumb() {

    const { pathname } = useLocation();

    let title = "Dashboard";

    // ==========================
    // DASHBOARD
    // ==========================

    if (pathname === "/admin") {

        title = "Dashboard";

    }

    // ==========================
    // CATEGORIES
    // ==========================

    else if (pathname === "/admin/categories") {

        title = "Categories";

    }

    else if (pathname === "/admin/category/add") {

        title = "Add Category";

    }

    else if (pathname.startsWith("/admin/category/edit/")) {

        title = "Edit Category";

    }

    // ==========================
    // USERS
    // ==========================

    else if (pathname === "/admin/users") {

        title = "Users";

    }

    // ==========================
    // VIEW USER
    // IMPORTANT:
    // CHECK EDIT BEFORE GENERAL USER
    // ==========================

    else if (pathname.startsWith("/admin/user/view/")) {

        title = "View User";

    }

    // ==========================
    // EDIT USER
    // ==========================

    else if (pathname.startsWith("/admin/user/edit/")) {

        title = "Edit User";

    }

    // ==========================
    // PROJECTS
    // ==========================

    else if (pathname === "/admin/projects") {

        title = "Projects";

    }

    else if (pathname.startsWith("/admin/project/")) {

        title = "Project Details";

    }

    // ==========================
    // APPLICATIONS
    // ==========================

    else if (pathname === "/admin/applications") {

        title = "Applications";

    }

    // ==========================
    // PAYMENTS
    // ==========================

    else if (pathname === "/admin/payments") {

        title = "Payments";

    }

    return (

        <section
            className="admin-breadcrumb"
            style={{
                backgroundImage:
                    `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${breadcrumbImg})`
            }}
        >

            <div className="admin-overlay">

                <div className="container text-center">

                    <h1>
                        {title}
                    </h1>

                    <nav>

                        <Link to="/admin">
                            Dashboard
                        </Link>

                        {pathname !== "/admin" && (

                            <>

                                <span> / </span>

                                <span>
                                    {title}
                                </span>

                            </>

                        )}

                    </nav>

                </div>

            </div>

        </section>

    );

}