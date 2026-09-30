import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

export default function Breadcrumb({ title }) {

    const location = useLocation();

    // Remove empty values and Firestore document ids
    const path = location.pathname
        .split("/")
        .filter(Boolean)
        .filter((item) => item.length < 20);

    // If title is passed, use it.
    // Otherwise use last URL segment.
    const pageTitle =
        title ||
        (path.length > 0
            ? path[path.length - 1]
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())
            : "Home");

    return (

        <section className="breadcrumb-banner">

            <div className="overlay">

                <div className="container text-center">

                    <h1>{pageTitle}</h1>

                    <nav className="breadcrumb-nav">

                        <Link to="/">Home</Link>

                        {path.map((item, index) => {

                            const route =
                                "/" + path.slice(0, index + 1).join("/");

                            const text = item
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase());

                            return (

                                <span key={route}>

                                    {" / "}

                                    {index === path.length - 1 ? (
                                        <span>{text}</span>
                                    ) : (
                                        <Link to={route}>{text}</Link>
                                    )}

                                </span>

                            );

                        })}

                    </nav>

                </div>

            </div>

        </section>

    );
}