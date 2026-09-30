import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import {
    FaBuilding,
    FaSearch,
    FaGlobe,
    FaIndustry,
} from "react-icons/fa";

import "./AdminStartups.css";


export default function AdminStartups() {

    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    // ==============================
    // LOAD BUSINESSES
    // ==============================

    useEffect(() => {

        loadStartups();

    }, []);


    const loadStartups = async () => {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(db, "businesses")
            );

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Startups:", data);

            setStartups(data);

        } catch (error) {

            console.error(
                "Error loading startups:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // SEARCH
    // ==============================

    const filteredStartups = startups.filter((startup) => {

        const name =
            startup.businessName ||
            startup.name ||
            "";

        const industry =
            startup.industry ||
            "";

        return (
            name.toLowerCase().includes(
                search.toLowerCase()
            ) ||
            industry.toLowerCase().includes(
                search.toLowerCase()
            )
        );

    });


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="startups-page">

                <div className="startups-loading">

                    <div className="startup-spinner"></div>

                    <h3>
                        Loading Startups...
                    </h3>

                </div>

            </div>
        );

    }


    // ==============================
    // UI
    // ==============================

    return (

        <div className="startups-page">


            {/* HEADER */}

            <div className="startups-header">

                <div>

                    <h2>
                        Manage Startups
                    </h2>

                    <p>
                        View and manage businesses created by founders.
                    </p>

                </div>


                <div className="startup-count">

                    Total Startups: {startups.length}

                </div>

            </div>


            {/* SEARCH */}

            <div className="startups-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search startup by name or industry..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* TABLE */}

            <div className="startups-table-container">

                <table className="startups-table">

                    <thead>

                        <tr>

                            <th>
                                S.No.
                            </th>

                            <th>
                                Startup
                            </th>

                            <th>
                                Industry
                            </th>

                            <th>
                                Description
                            </th>

                            <th>
                                Website
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStartups.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="no-startups"
                                >

                                    <FaBuilding />

                                    <p>
                                        No Startups Found
                                    </p>

                                </td>

                            </tr>

                        ) : (

                            filteredStartups.map(
                                (startup, index) => (

                                    <tr
                                        key={startup.id}
                                    >

                                        {/* SERIAL */}

                                        <td>
                                            {index + 1}
                                        </td>


                                        {/* STARTUP */}

                                        <td>

                                            <div className="startup-name">

                                                <div className="startup-icon">

                                                    <FaBuilding />

                                                </div>

                                                <strong>

                                                    {
                                                        startup.businessName ||
                                                        startup.name ||
                                                        "Unnamed Startup"
                                                    }

                                                </strong>

                                            </div>

                                        </td>


                                        {/* INDUSTRY */}

                                        <td>

                                            <span className="industry-badge">

                                                <FaIndustry />

                                                {
                                                    startup.industry ||
                                                    "N/A"
                                                }

                                            </span>

                                        </td>


                                        {/* DESCRIPTION */}

                                        <td>

                                            <div className="startup-description">

                                                {
                                                    startup.description ||
                                                    "No description available"
                                                }

                                            </div>

                                        </td>


                                        {/* WEBSITE */}

                                        <td>

                                            {startup.website ? (

                                                <a
                                                    href={
                                                        startup.website
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="website-link"
                                                >

                                                    <FaGlobe />

                                                    Visit

                                                </a>

                                            ) : (

                                                <span>
                                                    N/A
                                                </span>

                                            )}

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