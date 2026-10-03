import { Link } from "react-router-dom";
import "../styles/AdminBreadcrumb.css";
import breadcrumbImg from "../../../assets/hero.png";

export default function AdminBreadcrumb() {

    return (

        <section
            className="admin-breadcrumb"
            style={{
                backgroundImage:
                    `linear-gradient(rgba(7,29,73,.72), rgba(7,29,73,.72)), url(${breadcrumbImg})`
            }}
        >

            <div className="admin-overlay">

                <div className="container text-center">

                    <h1>
                        Admin Dashboard
                    </h1>

                    <nav>

                        <Link to="/admin">
                            Dashboard
                        </Link>

                    </nav>

                </div>

            </div>

        </section>

    );

}