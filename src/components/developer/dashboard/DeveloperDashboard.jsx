import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaProjectDiagram,
    FaFileAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaUser,
    FaEye,
    FaRocket
} from "react-icons/fa";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import ProjectService from "../../../services/ProjectService";
import ApplicationService from "../../../services/ApplicationService";

import "./DeveloperDashboard.css";

export default function DeveloperDashboard() {

    const navigate = useNavigate();

    const user = AuthService.getUser();

    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD DASHBOARD DATA
    // =====================================================

    async function loadDashboard() {

        try {

            setLoading(true);


            // ==========================
            // LOAD PROJECTS
            // ==========================

            const projectData =
                await ProjectService.getAllProjects();

            setProjects(projectData);


            // ==========================
            // LOAD DEVELOPER APPLICATIONS
            // ==========================

            if (user?.uid) {

                const applicationData =
                    await ApplicationService
                        .getApplicationsByDeveloper(user.uid);

                setApplications(applicationData);

            }

        }

        catch (err) {

            console.error(
                "Developer Dashboard Error:",
                err
            );

            toast.error(
                err.message ||
                "Unable to load dashboard."
            );

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadDashboard();

    }, []);


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalProjects =
        projects.length;


    const openProjects =
        projects.filter(
            project =>
                project.workStatus === "Open"
        ).length;


    const totalApplications =
        applications.length;


    const acceptedApplications =
        applications.filter(
            application =>
                application.status === "Accepted"
        ).length;


    const pendingApplications =
        applications.filter(
            application =>
                application.status === "Pending"
        ).length;


    const rejectedApplications =
        applications.filter(
            application =>
                application.status === "Rejected"
        ).length;


    // =====================================================
    // RECENT DATA
    // =====================================================

    const recentProjects =
        projects.slice(0, 3);


    const recentApplications =
        applications.slice(0, 3);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <>

                <Breadcrumb
                    title="Developer Dashboard"
                    page="Dashboard"
                />

                <div className="developer-loading">

                    <div className="developer-spinner"></div>

                    <p>
                        Loading Developer Dashboard...
                    </p>

                </div>

            </>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <>

            <Breadcrumb
                title="Developer Dashboard"
                page="Dashboard"
            />


            <div className="developer-dashboard">


                {/* =================================================
                    WELCOME
                ================================================= */}

                <div className="developer-welcome">

                    <div>

                        <h1>
                            Developer Dashboard
                        </h1>

                        <p>
                            Find projects, submit applications
                            and manage your developer profile.
                        </p>

                    </div>


                    <button
                        className="developer-profile-btn"
                        onClick={() =>
                            navigate("/developer/profile")
                        }
                    >

                        <FaUser />

                        My Profile

                    </button>

                </div>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <div className="developer-stats-grid">


                    {/* TOTAL PROJECTS */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon blue">

                            <FaProjectDiagram />

                        </div>

                        <div>

                            <span>
                                Total Projects
                            </span>

                            <h2>
                                {totalProjects}
                            </h2>

                            <small>
                                Available Projects
                            </small>

                        </div>

                    </div>


                    {/* OPEN PROJECTS */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon purple">

                            <FaRocket />

                        </div>

                        <div>

                            <span>
                                Open Projects
                            </span>

                            <h2>
                                {openProjects}
                            </h2>

                            <small>
                                Currently Open
                            </small>

                        </div>

                    </div>


                    {/* APPLICATIONS */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon orange">

                            <FaFileAlt />

                        </div>

                        <div>

                            <span>
                                Applications
                            </span>

                            <h2>
                                {totalApplications}
                            </h2>

                            <small>
                                My Applications
                            </small>

                        </div>

                    </div>


                    {/* ACCEPTED */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon green">

                            <FaCheckCircle />

                        </div>

                        <div>

                            <span>
                                Accepted
                            </span>

                            <h2>
                                {acceptedApplications}
                            </h2>

                            <small>
                                Accepted Applications
                            </small>

                        </div>

                    </div>


                    {/* PENDING */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon yellow">

                            <FaClock />

                        </div>

                        <div>

                            <span>
                                Pending
                            </span>

                            <h2>
                                {pendingApplications}
                            </h2>

                            <small>
                                Waiting For Response
                            </small>

                        </div>

                    </div>


                    {/* REJECTED */}

                    <div className="developer-stat-card">

                        <div className="developer-stat-icon red">

                            <FaTimesCircle />

                        </div>

                        <div>

                            <span>
                                Rejected
                            </span>

                            <h2>
                                {rejectedApplications}
                            </h2>

                            <small>
                                Rejected Applications
                            </small>

                        </div>

                    </div>


                </div>


                {/* =================================================
                    RECENT PROJECTS
                ================================================= */}

                <div className="developer-section">


                    <div className="developer-section-header">

                        <div>

                            <h2>
                                Recent Projects
                            </h2>

                            <p>
                                Latest startup opportunities
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/developer/projects")
                            }
                        >

                            <FaEye />

                            View All

                        </button>

                    </div>


                    <div className="developer-list">


                        {recentProjects.length > 0 ? (

                            recentProjects.map(
                                (project) => (

                                    <div
                                        className="developer-list-item"
                                        key={project.id}
                                    >


                                        <div className="developer-project-icon">

                                            <FaProjectDiagram />

                                        </div>


                                        <div className="developer-item-info">

                                            <strong>
                                                {project.title}
                                            </strong>

                                            <span>
                                                {project.category ||
                                                    "Not specified"}
                                            </span>

                                        </div>


                                        <span
                                            className={
                                                project.workStatus === "Open"
                                                    ? "developer-status active"
                                                    : "developer-status completed"
                                            }
                                        >

                                            {project.workStatus ||
                                                "Unknown"}

                                        </span>


                                        <button
                                            className="developer-view-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/developer/project/${project.id}`
                                                )
                                            }
                                        >

                                            View

                                        </button>

                                    </div>

                                )

                            )

                        ) : (

                            <div className="developer-empty">

                                <FaProjectDiagram />

                                <p>
                                    No projects available.
                                </p>

                            </div>

                        )}

                    </div>

                </div>


                {/* =================================================
                    RECENT APPLICATIONS
                ================================================= */}

                <div className="developer-section">


                    <div className="developer-section-header">

                        <div>

                            <h2>
                                Recent Applications
                            </h2>

                            <p>
                                Your latest project applications
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    "/developer/applications"
                                )
                            }
                        >

                            <FaEye />

                            View All

                        </button>

                    </div>


                    <div className="developer-list">


                        {recentApplications.length > 0 ? (

                            recentApplications.map(
                                (application) => (

                                    <div
                                        className="developer-list-item"
                                        key={application.id}
                                    >


                                        <div className="developer-application-avatar">

                                            {(
                                                application.developerName ||
                                                user?.name ||
                                                "D"
                                            )
                                                .substring(0, 2)
                                                .toUpperCase()}

                                        </div>


                                        <div className="developer-item-info">

                                            <strong>

                                                {application.developerName ||
                                                    user?.name ||
                                                    "Developer"}

                                            </strong>

                                            <span>

                                                Project ID:{" "}

                                                {application.projectId ||
                                                    "N/A"}

                                            </span>

                                        </div>


                                        <span
                                            className={
                                                `developer-status ${
                                                    application.status ===
                                                    "Accepted"
                                                        ? "accepted"
                                                        : application.status ===
                                                          "Rejected"
                                                        ? "rejected"
                                                        : "pending"
                                                }`
                                            }
                                        >

                                            {application.status ||
                                                "Pending"}

                                        </span>


                                        <button
                                            className="developer-view-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/developer/applications`
                                                )
                                            }
                                        >

                                            View

                                        </button>

                                    </div>

                                )

                            )

                        ) : (

                            <div className="developer-empty">

                                <FaFileAlt />

                                <p>
                                    You have not applied
                                    to any project yet.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/developer/projects"
                                        )
                                    }
                                >

                                    Browse Projects

                                </button>

                            </div>

                        )}

                    </div>

                </div>


                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <div className="developer-quick-actions">


                    <button
                        onClick={() =>
                            navigate("/developer/projects")
                        }
                    >

                        <FaProjectDiagram />

                        Browse Projects

                    </button>


                    <button
                        onClick={() =>
                            navigate("/developer/applications")
                        }
                    >

                        <FaFileAlt />

                        My Applications

                    </button>


                    <button
                        onClick={() =>
                            navigate("/developer/profile")
                        }
                    >

                        <FaUser />

                        My Profile

                    </button>

                </div>


            </div>

        </>

    );

}