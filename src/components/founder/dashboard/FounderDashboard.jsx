import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBuilding,
    FaProjectDiagram,
    FaFileAlt,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaRocket,
    FaEye
} from "react-icons/fa";

import AuthService from "../../../services/AuthService";
import ProjectService from "../../../services/ProjectService";
import ApplicationService from "../../../services/ApplicationService";

import "./FounderDashboard.css";

export default function FounderDashboard() {

    const navigate = useNavigate();
    const user = AuthService.getUser();

    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboardData();

    }, []);

    async function loadDashboardData() {

        try {

            setLoading(true);

            const projectData =
                await ProjectService.getProjectsByFounder(
                    user.uid
                );

            const applicationData =
                await ApplicationService.getApplicationsByFounder(
                    user.uid
                );

            setProjects(projectData || []);
            setApplications(applicationData || []);

        } catch (error) {

            console.error(
                "Dashboard loading error:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    /* =========================
       PROJECT COUNTS
    ========================= */

    const totalProjects = projects.length;

    const activeProjects =
        projects.filter(
            item =>
                String(item.workStatus || "")
                    .toLowerCase() === "active"
        ).length;

    const completedProjects =
        projects.filter(
            item =>
                String(item.workStatus || "")
                    .toLowerCase() === "completed"
        ).length;


    /* =========================
       APPLICATION COUNTS
    ========================= */

    const totalApplications =
        applications.length;

    const acceptedApplications =
        applications.filter(
            item =>
                String(item.status || "")
                    .toLowerCase() === "accepted"
        ).length;

    const pendingApplications =
        applications.filter(
            item =>
                String(item.status || "")
                    .toLowerCase() === "pending"
        ).length;

    const rejectedApplications =
        applications.filter(
            item =>
                String(item.status || "")
                    .toLowerCase() === "rejected"
        ).length;


    /* =========================
       RECENT DATA
    ========================= */

    const recentProjects =
        projects.slice(0, 3);

    const recentApplications =
        applications.slice(0, 3);


    if (loading) {

        return (

            <div className="founder-loading">

                <div className="founder-spinner"></div>

                <p>
                    Loading Founder Dashboard...
                </p>

            </div>

        );

    }


    return (

        <div className="founder-dashboard">


            {/* =========================
                HEADER
            ========================= */}

            <div className="founder-welcome">

                <div>

                    <h1>
                        Founder Dashboard
                    </h1>

                    <p>
                        Manage your startup, projects
                        and developer applications.
                    </p>

                </div>


                <button
                    className="founder-business-btn"
                    onClick={() =>
                        navigate("/founder/business")
                    }
                >

                    <FaBuilding />

                    Manage Business

                </button>

            </div>


            {/* =========================
                STATISTICS
            ========================= */}

            <div className="founder-stats-grid">


                <div className="founder-stat-card">

                    <div className="stat-icon blue">
                        <FaBuilding />
                    </div>

                    <div>

                        <span>
                            Registered Business
                        </span>

                        <h2>
                            1
                        </h2>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon purple">
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
                            Projects Created
                        </small>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon green">
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
                            Developer Applications
                        </small>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon success">
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
                            Accepted Developers
                        </small>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon warning">
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
                            Pending Applications
                        </small>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon danger">
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


                <div className="founder-stat-card">

                    <div className="stat-icon blue">
                        <FaRocket />
                    </div>

                    <div>

                        <span>
                            Active Projects
                        </span>

                        <h2>
                            {activeProjects}
                        </h2>

                        <small>
                            Currently Active
                        </small>

                    </div>

                </div>


                <div className="founder-stat-card">

                    <div className="stat-icon purple">
                        <FaCheckCircle />
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <h2>
                            {completedProjects}
                        </h2>

                        <small>
                            Completed Projects
                        </small>

                    </div>

                </div>

            </div>


            {/* =========================
                RECENT PROJECTS
            ========================= */}

            <div className="founder-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Recent Projects
                        </h2>

                        <p>
                            Your recently created projects
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/founder/projects")
                        }
                    >

                        <FaEye />

                        View All

                    </button>

                </div>


                <div className="recent-list">

                    {recentProjects.length > 0 ? (

                        recentProjects.map(
                            (project) => (

                                <div
                                    className="recent-item"
                                    key={project.id}
                                >

                                    <div className="recent-icon">

                                        <FaProjectDiagram />

                                    </div>


                                    <div className="recent-info">

                                        <strong>
                                            {project.title}
                                        </strong>

                                        <span>
                                            {project.category}
                                        </span>

                                    </div>


                                    <span
                                        className={`status ${
                                            String(
                                                project.workStatus || ""
                                            ).toLowerCase()
                                        }`}
                                    >

                                        {project.workStatus}

                                    </span>

                                </div>

                            )

                        )

                    ) : (

                        <div className="founder-empty">

                            No Projects Found

                        </div>

                    )}

                </div>

            </div>


            {/* =========================
                RECENT APPLICATIONS
            ========================= */}

            <div className="founder-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Recent Applications
                        </h2>

                        <p>
                            Latest developer applications
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate(
                                "/founder/applications"
                            )
                        }
                    >

                        <FaEye />

                        View All

                    </button>

                </div>


                <div className="recent-list">

                    {recentApplications.length > 0 ? (

                        recentApplications.map(
                            (application) => (

                                <div
                                    className="recent-item"
                                    key={application.id}
                                >

                                    <div className="app-avatar">

                                        {String(
                                            application.developerName ||
                                            "U"
                                        )
                                            .substring(0, 2)
                                            .toUpperCase()}

                                    </div>


                                    <div className="recent-info">

                                        <strong>
                                            {
                                                application.developerName ||
                                                "Unknown Developer"
                                            }
                                        </strong>

                                        <span>
                                            {
                                                application.projectTitle ||
                                                application.projectName ||
                                                "Project"
                                            }
                                        </span>

                                    </div>


                                    <span
                                        className={`status ${
                                            String(
                                                application.status || ""
                                            ).toLowerCase()
                                        }`}
                                    >

                                        {
                                            application.status ||
                                            "Pending"
                                        }

                                    </span>

                                </div>

                            )

                        )

                    ) : (

                        <div className="founder-empty">

                            No Applications Found

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}