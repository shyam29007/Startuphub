import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig.js";
import { FaSearch, FaUserPlus } from "react-icons/fa";

import "./AdminApplications.css";

export default function AdminApplications() {

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(db, "applications")
            );

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log("Applications:", data);

            setApplications(data);

        } catch (error) {

            console.error(
                "Error loading applications:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // SEARCH
    // ==============================

    const filteredApplications = applications.filter(
        (application) => {

            const searchText = search.toLowerCase();

            return (
                String(application.developerName || "")
                    .toLowerCase()
                    .includes(searchText) ||

                String(application.developerEmail || "")
                    .toLowerCase()
                    .includes(searchText) ||

                String(application.projectId || "")
                    .toLowerCase()
                    .includes(searchText) ||

                String(application.founderId || "")
                    .toLowerCase()
                    .includes(searchText) ||

                String(application.status || "")
                    .toLowerCase()
                    .includes(searchText)
            );

        }
    );


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="admin-page-loading">
                Loading Applications...
            </div>
        );

    }


    return (

        <div className="admin-applications-page">

            {/* ==========================================
                HEADER CARD
            ========================================== */}

            <div className="admin-applications-header">

                <div className="applications-title">

                    <h2>
                        Manage Applications
                    </h2>

                    <p>
                        View and manage all developer applications.
                    </p>

                </div>

                <div className="applications-count">

                    Total Applications: {applications.length}

                </div>

            </div>


            {/* ==========================================
                SEARCH CARD
            ========================================== */}

            <div className="applications-search-card">

                <div className="applications-search">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ==========================================
                TABLE CARD
            ========================================== */}

            <div className="applications-table-container">

                <table className="applications-table">

                    <thead>

                        <tr>

                            <th>S.No.</th>

                            <th>Developer</th>

                            <th>Project ID</th>

                            <th>Founder ID</th>

                            <th>Status</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredApplications.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="empty-applications"
                                >

                                    <FaUserPlus />

                                    <span>
                                        No Applications Found
                                    </span>

                                </td>

                            </tr>

                        ) : (

                            filteredApplications.map(
                                (application, index) => (

                                    <tr
                                        key={application.id}
                                    >

                                        {/* S.NO */}

                                        <td className="serial-number">

                                            {index + 1}

                                        </td>


                                        {/* DEVELOPER */}

                                        <td>

                                            <div className="developer-info">

                                                <strong>
                                                    {
                                                        application.developerName ||
                                                        "Unknown"
                                                    }
                                                </strong>

                                                <small>
                                                    {
                                                        application.developerEmail ||
                                                        "N/A"
                                                    }
                                                </small>

                                            </div>

                                        </td>


                                        {/* PROJECT ID */}

                                        <td>

                                            <span className="id-text">

                                                {
                                                    application.projectId ||
                                                    "N/A"
                                                }

                                            </span>

                                        </td>


                                        {/* FOUNDER ID */}

                                        <td>

                                            <span className="id-text">

                                                {
                                                    application.founderId ||
                                                    "N/A"
                                                }

                                            </span>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`application-status ${String(
                                                    application.status || "pending"
                                                ).toLowerCase()}`}
                                            >

                                                {
                                                    application.status ||
                                                    "Pending"
                                                }

                                            </span>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}