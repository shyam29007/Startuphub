import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaSearch,
    FaFilter,
    FaBuilding,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaCode,
    FaArrowRight,
    FaProjectDiagram
} from "react-icons/fa";

import Breadcrumb from "../../shared/Breadcrumb";

import ProjectService from "../../../services/ProjectService";
import BusinessService from "../../../services/BusinessService";

import "./BrowseProjects.css";


export default function BrowseProjects() {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");


    // ==========================================
    // LOAD PROJECTS
    // ==========================================

    async function loadProjects() {

        try {

            setLoading(true);

            const projectData =
                await ProjectService.getAllProjects();


            const projectsWithBusiness =
                await Promise.all(

                    projectData.map(
                        async (project) => {

                            let business = null;

                            if (project.businessId) {

                                try {

                                    business =
                                        await BusinessService.getBusiness(
                                            project.businessId
                                        );

                                } catch (err) {

                                    console.log(
                                        "Business not found:",
                                        project.businessId
                                    );

                                }

                            }


                            return {

                                ...project,

                                businessName:
                                    business?.businessName ||
                                    "Business Not Available",

                                businessLogo:
                                    business?.logo || ""

                            };

                        }
                    )

                );


            setProjects(projectsWithBusiness);

        }

        catch (err) {

            console.error(
                "Load Projects Error:",
                err
            );

            toast.error(
                err.message ||
                "Unable to load projects."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadProjects();

    }, []);


    // ==========================================
    // CATEGORIES
    // ==========================================

    const categories = [

        "All",

        ...new Set(
            projects
                .map(
                    project => project.category
                )
                .filter(Boolean)
        )

    ];


    // ==========================================
    // FILTER PROJECTS
    // ==========================================

    const filteredProjects =
        projects.filter((project) => {

            const searchText =
                search.toLowerCase().trim();


            const matchesSearch =

                String(
                    project.title || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    project.category || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    project.businessName || ""
                )
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =

                category === "All" ||

                project.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <>

                <Breadcrumb
                    title="Projects"
                    page="Projects"
                />

                <div className="developer-project-loading">

                    <div className="developer-project-spinner"></div>

                    <h5>
                        Loading Projects...
                    </h5>

                    <p>
                        Finding opportunities for you
                    </p>

                </div>

            </>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <>

            <Breadcrumb
                title="Projects"
                page="Projects"
            />


            <div className="developer-project-page">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="developer-project-header">

                    <div>

                        <div className="developer-project-title">

                            <FaProjectDiagram />

                            <h1>
                                Browse Projects
                            </h1>

                        </div>

                        <p>
                            Discover startup projects and
                            find opportunities that match
                            your skills.
                        </p>

                    </div>


                    <div className="developer-project-count">

                        <strong>
                            {filteredProjects.length}
                        </strong>

                        <span>
                            Projects Available
                        </span>

                    </div>

                </div>


                {/* =====================================
                    SEARCH + FILTER
                ===================================== */}

                <div className="developer-project-toolbar">


                    <div className="developer-project-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search projects, categories or businesses..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="developer-project-filter">

                        <FaFilter />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            {categories.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                </div>


                {/* =====================================
                    PROJECT GRID
                ===================================== */}

                <div className="developer-project-grid">


                    {filteredProjects.length > 0 ? (

                        filteredProjects.map(
                            (project) => (

                                <div
                                    className="developer-project-card"
                                    key={project.id}
                                >


                                    {/* CARD TOP */}

                                    <div className="developer-project-card-top">


                                        <div className="developer-project-business">


                                            {project.businessLogo ? (

                                                <img
                                                    src={
                                                        project.businessLogo
                                                    }
                                                    alt={
                                                        project.businessName
                                                    }
                                                />

                                            ) : (

                                                <div className="developer-business-placeholder">

                                                    <FaBuilding />

                                                </div>

                                            )}


                                            <div>

                                                <small>
                                                    Posted by
                                                </small>

                                                <strong>
                                                    {
                                                        project.businessName
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        <span
                                            className={
                                                project.workStatus === "Open"
                                                    ? "developer-project-status open"
                                                    : "developer-project-status closed"
                                            }
                                        >

                                            {project.workStatus || "Unknown"}

                                        </span>

                                    </div>


                                    {/* TITLE */}

                                    <h3>
                                        {
                                            project.title ||
                                            "Untitled Project"
                                        }
                                    </h3>


                                    {/* CATEGORY */}

                                    <span className="developer-project-category">

                                        {project.category ||
                                            "General"}

                                    </span>


                                    {/* DESCRIPTION */}

                                    <p className="developer-project-description">

                                        {project.description
                                            ? project.description.length > 110
                                                ? project.description.substring(
                                                    0,
                                                    110
                                                ) + "..."
                                                : project.description
                                            : "No project description available."
                                        }

                                    </p>


                                    {/* SKILLS */}

                                    <div className="developer-project-skills">

                                        <div className="skills-title">

                                            <FaCode />

                                            <span>
                                                Required Skills
                                            </span>

                                        </div>


                                        <div className="skills-list">

                                            {Array.isArray(
                                                project.skills
                                            )

                                                ? project.skills
                                                    .slice(0, 4)
                                                    .map(
                                                        (
                                                            skill,
                                                            index
                                                        ) => (

                                                            <span
                                                                key={index}
                                                            >
                                                                {skill}
                                                            </span>

                                                        )
                                                    )

                                                : (

                                                    <span>
                                                        {
                                                            project.skills ||
                                                            "Not specified"
                                                        }
                                                    </span>

                                                )}

                                        </div>

                                    </div>


                                    {/* PROJECT INFO */}

                                    <div className="developer-project-info">


                                        <div>

                                            <FaMoneyBillWave />

                                            <div>

                                                <small>
                                                    Budget
                                                </small>

                                                <strong>
                                                    ₹ {project.budget || "0"}
                                                </strong>

                                            </div>

                                        </div>


                                        <div>

                                            <FaCalendarAlt />

                                            <div>

                                                <small>
                                                    Deadline
                                                </small>

                                                <strong>
                                                    {
                                                        project.deadline ||
                                                        "Not specified"
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* BUTTON */}

                                    <Link
                                        to={
                                            `/developer/project/${project.id}`
                                        }
                                        className="developer-project-button"
                                    >

                                        View Details

                                        <FaArrowRight />

                                    </Link>


                                </div>

                            )
                        )

                    ) : (

                        <div className="developer-project-empty">

                            <div>

                                <FaProjectDiagram />

                            </div>

                            <h3>
                                No Projects Found
                            </h3>

                            <p>
                                Try changing your search
                                or category filter.
                            </p>

                            <button
                                onClick={() => {

                                    setSearch("");
                                    setCategory("All");

                                }}
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}