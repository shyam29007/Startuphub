import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaUserTie,
    FaCode,
    FaProjectDiagram,
    FaBriefcase,
    FaChartLine,
    FaUserPlus,
    FaArrowUp,
    FaClock,
    FaCheckCircle,
    FaUserShield,
    FaFolderOpen,
} from "react-icons/fa";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";


export default function AdminDashboard() {

    const navigate = useNavigate();


    // =========================================================
    // STATE
    // =========================================================

    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);

    const [stats, setStats] = useState({

        totalUsers: 0,

        founders: 0,

        developers: 0,

        admins: 0,

        projects: 0,

        applications: 0,

        categories: 0,

        activeUsers: 0,

    });


    // =========================================================
    // LOAD DASHBOARD DATA
    // =========================================================

    useEffect(() => {

        loadDashboardData();

    }, []);


    const loadDashboardData = async () => {

        try {

            setLoading(true);


            // =================================================
            // USERS
            // =================================================

            const usersSnapshot = await getDocs(
                collection(db, "users")
            );


            const usersData = usersSnapshot.docs.map((doc) => ({

                id: doc.id,

                ...doc.data(),

            }));


            setUsers(usersData);


            // =================================================
            // COUNT ROLES
            // =================================================

            const founders = usersData.filter(
                (user) =>
                    String(user.role || "").toLowerCase() === "founder"
            ).length;


            const developers = usersData.filter(
                (user) =>
                    String(user.role || "").toLowerCase() === "developer"
            ).length;


            const admins = usersData.filter(
                (user) =>
                    String(user.role || "").toLowerCase() === "admin"
            ).length;


            // =================================================
            // ACTIVE USERS
            // =================================================

            const activeUsers = usersData.filter(
                (user) =>
                    String(user.status || "").toLowerCase() === "active"
            ).length;


            // =================================================
            // PROJECTS
            // =================================================

            let projectsCount = 0;

            try {

                const projectsSnapshot = await getDocs(
                    collection(db, "projects")
                );

                projectsCount = projectsSnapshot.size;

            } catch (error) {

                console.log(
                    "Projects collection not available:",
                    error.message
                );

            }


            // =================================================
            // APPLICATIONS
            // =================================================

            let applicationsCount = 0;

            try {

                const applicationsSnapshot = await getDocs(
                    collection(db, "applications")
                );

                applicationsCount = applicationsSnapshot.size;

            } catch (error) {

                console.log(
                    "Applications collection not available:",
                    error.message
                );

            }


            // =================================================
            // CATEGORIES
            // =================================================

            let categoriesCount = 0;

            try {

                const categoriesSnapshot = await getDocs(
                    collection(db, "categories")
                );

                categoriesCount = categoriesSnapshot.size;

            } catch (error) {

                console.log(
                    "Categories collection not available:",
                    error.message
                );

            }


            // =================================================
            // SET DASHBOARD STATS
            // =================================================

            setStats({

                totalUsers: usersData.length,

                founders,

                developers,

                admins,

                projects: projectsCount,

                applications: applicationsCount,

                categories: categoriesCount,

                activeUsers,

            });


        } catch (error) {

            console.error(
                "Error loading dashboard data:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // ACTIVE USER PERCENTAGE
    // =========================================================

    const activeUserPercentage = stats.totalUsers > 0

        ? Math.round(
            (stats.activeUsers / stats.totalUsers) * 100
        )

        : 0;


    // =========================================================
    // RECENT USERS
    // =========================================================

    const recentUsers = [...users]

        .sort((a, b) => {

            const dateA =
                a.createdAt?.seconds ||
                a.createdAt?.toMillis?.() ||
                0;

            const dateB =
                b.createdAt?.seconds ||
                b.createdAt?.toMillis?.() ||
                0;

            return dateB - dateA;

        })

        .slice(0, 4);


    // =========================================================
    // USER AVATAR
    // =========================================================

    const getInitials = (name) => {

        if (!name) {
            return "U";
        }

        const words = String(name)
            .trim()
            .split(" ");

        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    };


    // =========================================================
    // ROLE CLASS
    // =========================================================

    const getRoleClass = (role) => {

        const normalizedRole =
            String(role || "").toLowerCase();

        if (normalizedRole === "founder") {
            return "founder-badge";
        }

        if (normalizedRole === "developer") {
            return "developer-badge";
        }

        if (normalizedRole === "admin") {
            return "admin-badge";
        }

        return "developer-badge";

    };


    // =========================================================
    // FORMAT ROLE
    // =========================================================

    const formatRole = (role) => {

        if (!role) {
            return "N/A";
        }

        return (
            String(role).charAt(0).toUpperCase() +
            String(role).slice(1)
        );

    };


    // =========================================================
    // STATUS
    // =========================================================

    const getStatus = (user) => {

        const status =
            String(user.status || "").toLowerCase();

        return status === "active"
            ? "Active"
            : "Inactive";

    };


    // =========================================================
    // QUICK NAVIGATION
    // =========================================================

    const goToUsers = () => {

        navigate("/admin/users");

    };


    const goToProjects = () => {

        navigate("/admin/projects");

    };


    const goToApplications = () => {

        navigate("/admin/applications");

    };


    const goToCategories = () => {

        navigate("/admin/categories");

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="admin-dashboard">

                <div className="dashboard-loading">

                    <div className="dashboard-spinner"></div>

                    <p>
                        Loading Admin Dashboard...
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // DASHBOARD UI
    // =========================================================

    return (

        <div className="admin-dashboard">


            {/* =====================================================
                WELCOME SECTION
            ===================================================== */}

            <div className="dashboard-welcome">

                <div>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Welcome back, Admin 👋
                    </p>

                    <span>
                        Here's what's happening with your
                        StartupHub platform today.
                    </span>

                </div>


                <div className="dashboard-date">

                    <FaClock />

                    <div>

                        <small>
                            Today
                        </small>

                        <strong>

                            {new Date().toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}

                        </strong>

                    </div>

                </div>

            </div>



            {/* =====================================================
                FIRST STATISTICS
            ===================================================== */}

            <div className="dashboard-stats">


                {/* TOTAL USERS */}

                <div className="stat-card">

                    <div className="stat-icon users">
                        <FaUsers />
                    </div>

                    <div className="stat-content">

                        <span>
                            Total Users
                        </span>

                        <h2>
                            {stats.totalUsers}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            Registered Users

                        </small>

                    </div>

                </div>



                {/* FOUNDERS */}

                <div className="stat-card">

                    <div className="stat-icon founders">
                        <FaUserTie />
                    </div>

                    <div className="stat-content">

                        <span>
                            Founders
                        </span>

                        <h2>
                            {stats.founders}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            Registered Founders

                        </small>

                    </div>

                </div>



                {/* DEVELOPERS */}

                <div className="stat-card">

                    <div className="stat-icon developers">
                        <FaCode />
                    </div>

                    <div className="stat-content">

                        <span>
                            Developers
                        </span>

                        <h2>
                            {stats.developers}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            Registered Developers

                        </small>

                    </div>

                </div>



                {/* ADMINS */}

                <div className="stat-card">

                    <div className="stat-icon admins">
                        <FaUserShield />
                    </div>

                    <div className="stat-content">

                        <span>
                            Admins
                        </span>

                        <h2>
                            {stats.admins}
                        </h2>

                        <small className="increase">

                            <FaCheckCircle />

                            Platform Admins

                        </small>

                    </div>

                </div>

            </div>



            {/* =====================================================
                SECOND STATISTICS
            ===================================================== */}

            <div className="dashboard-stats">


                {/* PROJECTS */}

                <div className="stat-card">

                    <div className="stat-icon projects">
                        <FaProjectDiagram />
                    </div>

                    <div className="stat-content">

                        <span>
                            Total Projects
                        </span>

                        <h2>
                            {stats.projects}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            Projects Created

                        </small>

                    </div>

                </div>



                {/* APPLICATIONS */}

                <div className="stat-card">

                    <div className="stat-icon applications">
                        <FaUserPlus />
                    </div>

                    <div className="stat-content">

                        <span>
                            Applications
                        </span>

                        <h2>
                            {stats.applications}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            Total Applications

                        </small>

                    </div>

                </div>



                {/* CATEGORIES */}

                <div className="stat-card">

                    <div className="stat-icon categories">
                        <FaChartLine />
                    </div>

                    <div className="stat-content">

                        <span>
                            Categories
                        </span>

                        <h2>
                            {stats.categories}
                        </h2>

                        <small className="increase">

                            <FaFolderOpen />

                            Available Categories

                        </small>

                    </div>

                </div>



                {/* ACTIVE USERS */}

                <div className="stat-card">

                    <div className="stat-icon users">
                        <FaUsers />
                    </div>

                    <div className="stat-content">

                        <span>
                            Active Users
                        </span>

                        <h2>
                            {stats.activeUsers}
                        </h2>

                        <small className="increase">

                            <FaArrowUp />

                            {activeUserPercentage}% of users

                        </small>

                    </div>

                </div>

            </div>



            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <div className="dashboard-grid">


                {/* =================================================
                    RECENT USERS
                ================================================= */}

                <div className="dashboard-panel">


                    <div className="panel-header">

                        <div>

                            <h3>
                                Recent Users
                            </h3>

                            <p>
                                Recently registered users
                            </p>

                        </div>


                        <button
                            onClick={goToUsers}
                        >
                            View All
                        </button>

                    </div>



                    <div className="recent-users">


                        {recentUsers.length === 0 ? (

                            <div className="empty-dashboard">

                                No users found.

                            </div>

                        ) : (

                            recentUsers.map((user) => {

                                const name =
                                    user.name ||
                                    user.fullName ||
                                    "Unknown User";

                                const email =
                                    user.email ||
                                    "N/A";

                                const role =
                                    user.role ||
                                    "N/A";

                                const status =
                                    getStatus(user);


                                return (

                                    <div
                                        className="user-row"
                                        key={user.id}
                                    >


                                        <div className="user-avatar">

                                            {getInitials(name)}

                                        </div>



                                        <div className="user-info">

                                            <strong>
                                                {name}
                                            </strong>

                                            <span>
                                                {email}
                                            </span>

                                        </div>



                                        <span
                                            className={`role-badge ${getRoleClass(role)}`}
                                        >
                                            {formatRole(role)}
                                        </span>



                                        <span
                                            className={`status ${
                                                status === "Active"
                                                    ? "active"
                                                    : "inactive"
                                            }`}
                                        >
                                            {status}
                                        </span>


                                    </div>

                                );

                            })

                        )}

                    </div>

                </div>



                {/* =================================================
                    PLATFORM OVERVIEW
                ================================================= */}

                <div className="dashboard-panel">


                    <div className="panel-header">

                        <div>

                            <h3>
                                Platform Overview
                            </h3>

                            <p>
                                Current platform status
                            </p>

                        </div>

                    </div>



                    {/* ACTIVE USERS */}

                    <div className="overview-item">

                        <div className="overview-title">

                            <span>
                                Active Users
                            </span>

                            <strong>
                                {activeUserPercentage}%
                            </strong>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill blue"
                                style={{
                                    width: `${activeUserPercentage}%`
                                }}
                            ></div>

                        </div>

                    </div>



                    {/* PROJECTS */}

                    <div className="overview-item">

                        <div className="overview-title">

                            <span>
                                Projects
                            </span>

                            <strong>
                                {stats.projects}
                            </strong>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill green"
                                style={{
                                    width:
                                        stats.projects > 0
                                            ? "100%"
                                            : "0%"
                                }}
                            ></div>

                        </div>

                    </div>



                    {/* APPLICATIONS */}

                    <div className="overview-item">

                        <div className="overview-title">

                            <span>
                                Applications
                            </span>

                            <strong>
                                {stats.applications}
                            </strong>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill orange"
                                style={{
                                    width:
                                        stats.applications > 0
                                            ? "100%"
                                            : "0%"
                                }}
                            ></div>

                        </div>

                    </div>



                    {/* CATEGORIES */}

                    <div className="overview-item">

                        <div className="overview-title">

                            <span>
                                Categories
                            </span>

                            <strong>
                                {stats.categories}
                            </strong>

                        </div>


                        <div className="progress-bar">

                            <div
                                className="progress-fill purple"
                                style={{
                                    width:
                                        stats.categories > 0
                                            ? "100%"
                                            : "0%"
                                }}
                            ></div>

                        </div>

                    </div>



                    {/* ACTIVE USER SUMMARY */}

                    <div className="approval-summary">

                        <div className="approval-icon">

                            <FaCheckCircle />

                        </div>


                        <div>

                            <strong>
                                {stats.activeUsers} Active Users
                            </strong>

                            <span>
                                currently active on StartupHub
                            </span>

                        </div>

                    </div>


                </div>

            </div>



            {/* =====================================================
                BOTTOM SECTION
            ===================================================== */}

            <div className="dashboard-bottom">


                {/* =================================================
                    RECENT ACTIVITIES
                ================================================= */}

                <div className="dashboard-panel">


                    <div className="panel-header">

                        <div>

                            <h3>
                                Recent Activities
                            </h3>

                            <p>
                                Latest platform activities
                            </p>

                        </div>

                    </div>



                    <div className="activity-list">


                        {recentUsers.length === 0 ? (

                            <div className="empty-dashboard">

                                No recent activities.

                            </div>

                        ) : (

                            recentUsers.map((user, index) => {

                                const name =
                                    user.name ||
                                    user.fullName ||
                                    "Unknown User";


                                return (

                                    <div
                                        className="activity-item"
                                        key={user.id}
                                    >

                                        <div
                                            className={`activity-dot ${
                                                index % 4 === 0
                                                    ? "blue-dot"
                                                    : index % 4 === 1
                                                        ? "green-dot"
                                                        : index % 4 === 2
                                                            ? "orange-dot"
                                                            : "purple-dot"
                                            }`}
                                        ></div>


                                        <div>

                                            <strong>
                                                New user registered
                                            </strong>

                                            <span>
                                                {name} created an account
                                            </span>

                                            <small>
                                                Recently
                                            </small>

                                        </div>

                                    </div>

                                );

                            })

                        )}

                    </div>

                </div>



                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <div className="dashboard-panel quick-actions">


                    <div className="panel-header">

                        <div>

                            <h3>
                                Quick Actions
                            </h3>

                            <p>
                                Manage your platform
                            </p>

                        </div>

                    </div>



                    {/* USERS */}

                    <button
                        className="quick-action"
                        onClick={goToUsers}
                    >

                        <FaUsers />

                        <span>
                            Manage Users
                        </span>

                    </button>



                    {/* CATEGORIES */}

                    <button
                        className="quick-action"
                        onClick={goToCategories}
                    >

                        <FaChartLine />

                        <span>
                            Manage Categories
                        </span>

                    </button>



                    {/* PROJECTS */}

                    <button
                        className="quick-action"
                        onClick={goToProjects}
                    >

                        <FaProjectDiagram />

                        <span>
                            Manage Projects
                        </span>

                    </button>



                    {/* APPLICATIONS */}

                    <button
                        className="quick-action"
                        onClick={goToApplications}
                    >

                        <FaUserPlus />

                        <span>
                            Manage Applications
                        </span>

                    </button>


                </div>


            </div>


        </div>

    );

}