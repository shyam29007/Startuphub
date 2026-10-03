import React, { useEffect, useMemo, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase/firebaseConfig";
import AuthService from "../../../services/AuthService";

import {
    FaBuilding,
    FaSearch,
    FaGlobe,
    FaIndustry,
    FaCheck,
    FaTimes,
    FaBan,
    FaUndo,
    FaClock,
    FaEye,
} from "react-icons/fa";

import "./AdminStartups.css";


export default function AdminStartups() {

    const [startups, setStartups] = useState([]);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedStartup, setSelectedStartup] = useState(null);


    // =====================================================
    // LOAD STARTUPS
    // =====================================================

    useEffect(() => {

        loadStartups();

    }, []);


    const loadStartups = async () => {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(db, "businesses")
            );

            const data = snapshot.docs.map((item) => {

                const startup = item.data();

                return {
                    id: item.id,
                    ...startup,
                    status: startup.status || "pending",
                };

            });

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


    // =====================================================
    // UPDATE STARTUP STATUS
    // =====================================================

    const updateStartupStatus = async (
        startupId,
        newStatus
    ) => {

        const startup = startups.find(
            (item) => item.id === startupId
        );

        if (!startup) {
            return;
        }


        const actionText = {

            approved: "approve",

            rejected: "reject",

            suspended: "suspend",

            pending: "restore",

        }[newStatus];


        const confirmed = window.confirm(
            `Are you sure you want to ${actionText} "${startup.businessName || startup.name || "this startup"}"?`
        );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(startupId);


        const admin = AuthService.getUser();

        const updateData = {
            status: newStatus,
            updatedAt: serverTimestamp()
        };

        if (newStatus === "approved") {
            updateData.approvedBy = admin.uid;
            updateData.approvedAt = serverTimestamp();
        }

        if (newStatus === "rejected") {
            updateData.rejectedBy = admin.uid;
            updateData.rejectedAt = serverTimestamp();
        }

        if (newStatus === "suspended") {
            updateData.suspendedBy = admin.uid;
            updateData.suspendedAt = serverTimestamp();
        }

        await updateDoc(
            doc(db, "businesses", startupId),
            updateData
        );


            setStartups((previous) =>
                previous.map((item) =>
                    item.id === startupId
                        ? {
                            ...item,
                            status: newStatus,
                        }
                        : item
                )
            );


        } catch (error) {

            console.error(
                "Error updating startup status:",
                error
            );

            alert(
                "Unable to update startup status. Please try again."
            );

        } finally {

            setActionLoading(null);

        }

    };


    // =====================================================
    // SEARCH + STATUS FILTER
    // =====================================================

    const filteredStartups = useMemo(() => {

        const searchValue =
            search.trim().toLowerCase();


        return startups.filter((startup) => {

            const name =
                startup.businessName ||
                startup.name ||
                "";

            const industry =
                startup.industry ||
                "";

            const description =
                startup.description ||
                "";

            const matchesSearch =
                name
                    .toLowerCase()
                    .includes(searchValue) ||

                industry
                    .toLowerCase()
                    .includes(searchValue) ||

                description
                    .toLowerCase()
                    .includes(searchValue);


            const matchesStatus =
                statusFilter === "all" ||
                startup.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        startups,
        search,
        statusFilter,
    ]);


    // =====================================================
    // COUNTS
    // =====================================================

    const totalStartups =
        startups.length;


    const pendingStartups =
        startups.filter(
            (startup) =>
                startup.status === "pending"
        ).length;


    const approvedStartups =
        startups.filter(
            (startup) =>
                startup.status === "approved"
        ).length;


    const rejectedStartups =
        startups.filter(
            (startup) =>
                startup.status === "rejected"
        ).length;


    const suspendedStartups =
        startups.filter(
            (startup) =>
                startup.status === "suspended"
        ).length;


    // =====================================================
    // STATUS
    // =====================================================

    const getStatusLabel = (status) => {

        switch (status) {

            case "approved":
                return "Approved";

            case "rejected":
                return "Rejected";

            case "suspended":
                return "Suspended";

            default:
                return "Pending";

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

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


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="startups-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="startups-header">

                <div>

                    <h2>
                        Manage Startups
                    </h2>

                    <p>
                        Review, approve and manage startups
                        created by founders.
                    </p>

                </div>


                <div className="startup-count">

                    Total Startups:
                    {" "}
                    {totalStartups}

                </div>

            </div>


            {/* =================================================
                STATUS SUMMARY
            ================================================= */}

            <div className="startup-summary">


                <button
                    type="button"
                    className={
                        `startup-summary-card total ${
                            statusFilter === "all"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setStatusFilter("all")
                    }
                >

                    <div className="summary-icon">
                        <FaBuilding />
                    </div>

                    <div>

                        <span>
                            Total
                        </span>

                        <strong>
                            {totalStartups}
                        </strong>

                    </div>

                </button>


                <button
                    type="button"
                    className={
                        `startup-summary-card pending ${
                            statusFilter === "pending"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setStatusFilter("pending")
                    }
                >

                    <div className="summary-icon">
                        <FaClock />
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingStartups}
                        </strong>

                    </div>

                </button>


                <button
                    type="button"
                    className={
                        `startup-summary-card approved ${
                            statusFilter === "approved"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setStatusFilter("approved")
                    }
                >

                    <div className="summary-icon">
                        <FaCheck />
                    </div>

                    <div>

                        <span>
                            Approved
                        </span>

                        <strong>
                            {approvedStartups}
                        </strong>

                    </div>

                </button>


                <button
                    type="button"
                    className={
                        `startup-summary-card rejected ${
                            statusFilter === "rejected"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setStatusFilter("rejected")
                    }
                >

                    <div className="summary-icon">
                        <FaTimes />
                    </div>

                    <div>

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {rejectedStartups}
                        </strong>

                    </div>

                </button>


                <button
                    type="button"
                    className={
                        `startup-summary-card suspended ${
                            statusFilter === "suspended"
                                ? "active"
                                : ""
                        }`
                    }
                    onClick={() =>
                        setStatusFilter("suspended")
                    }
                >

                    <div className="summary-icon">
                        <FaBan />
                    </div>

                    <div>

                        <span>
                            Suspended
                        </span>

                        <strong>
                            {suspendedStartups}
                        </strong>

                    </div>

                </button>


            </div>


            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <div className="startups-toolbar">


                <div className="startups-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search startup, industry or description..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                <select
                    className="startup-status-filter"
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                >

                    <option value="all">
                        All Startups
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="rejected">
                        Rejected
                    </option>

                    <option value="suspended">
                        Suspended
                    </option>

                </select>


            </div>


            {/* =================================================
                TABLE
            ================================================= */}

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
                                Status
                            </th>

                            <th>
                                Website
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStartups.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
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
                                (startup, index) => {

                                    const status =
                                        startup.status ||
                                        "pending";

                                    const isLoading =
                                        actionLoading ===
                                        startup.id;


                                    return (

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


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        `startup-status ${status}`
                                                    }
                                                >

                                                    {status ===
                                                        "pending" && (
                                                            <FaClock />
                                                        )}

                                                    {status ===
                                                        "approved" && (
                                                            <FaCheck />
                                                        )}

                                                    {status ===
                                                        "rejected" && (
                                                            <FaTimes />
                                                        )}

                                                    {status ===
                                                        "suspended" && (
                                                            <FaBan />
                                                        )}

                                                    {getStatusLabel(
                                                        status
                                                    )}

                                                </span>

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


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="startup-actions">


                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        className="startup-action view"
                                                        onClick={() =>
                                                            setSelectedStartup(
                                                                startup
                                                            )
                                                        }
                                                        title="View startup"
                                                    >

                                                        <FaEye />

                                                    </button>


                                                    {/* PENDING */}

                                                    {status ===
                                                        "pending" && (

                                                            <>

                                                                <button
                                                                    type="button"
                                                                    className="startup-action approve"
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    onClick={() =>
                                                                        updateStartupStatus(
                                                                            startup.id,
                                                                            "approved"
                                                                        )
                                                                    }
                                                                    title="Approve startup"
                                                                >

                                                                    <FaCheck />

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="startup-action reject"
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    onClick={() =>
                                                                        updateStartupStatus(
                                                                            startup.id,
                                                                            "rejected"
                                                                        )
                                                                    }
                                                                    title="Reject startup"
                                                                >

                                                                    <FaTimes />

                                                                </button>

                                                            </>

                                                        )}


                                                    {/* APPROVED */}

                                                    {status ===
                                                        "approved" && (

                                                            <button
                                                                type="button"
                                                                className="startup-action suspend"
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                onClick={() =>
                                                                    updateStartupStatus(
                                                                        startup.id,
                                                                        "suspended"
                                                                    )
                                                                }
                                                                title="Suspend startup"
                                                            >

                                                                <FaBan />

                                                            </button>

                                                        )}


                                                    {/* REJECTED */}

                                                    {status ===
                                                        "rejected" && (

                                                            <button
                                                                type="button"
                                                                className="startup-action restore"
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                onClick={() =>
                                                                    updateStartupStatus(
                                                                        startup.id,
                                                                        "pending"
                                                                    )
                                                                }
                                                                title="Restore startup"
                                                            >

                                                                <FaUndo />

                                                            </button>

                                                        )}


                                                    {/* SUSPENDED */}

                                                    {status ===
                                                        "suspended" && (

                                                            <button
                                                                type="button"
                                                                className="startup-action restore"
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                onClick={() =>
                                                                    updateStartupStatus(
                                                                        startup.id,
                                                                        "approved"
                                                                    )
                                                                }
                                                                title="Restore startup"
                                                            >

                                                                <FaUndo />

                                                            </button>

                                                        )}

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                }

                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* =================================================
                STARTUP DETAILS MODAL
            ================================================= */}

            {selectedStartup && (

                <div
                    className="startup-modal-overlay"
                    onClick={() =>
                        setSelectedStartup(null)
                    }
                >

                    <div
                        className="startup-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="startup-modal-header">

                            <div>

                                <h3>
                                    {
                                        selectedStartup.businessName ||
                                        selectedStartup.name ||
                                        "Startup Details"
                                    }
                                </h3>

                                <span
                                    className={
                                        `startup-status ${
                                            selectedStartup.status ||
                                            "pending"
                                        }`
                                    }
                                >
                                    {
                                        getStatusLabel(
                                            selectedStartup.status ||
                                            "pending"
                                        )
                                    }
                                </span>

                            </div>


                            <button
                                type="button"
                                className="startup-modal-close"
                                onClick={() =>
                                    setSelectedStartup(null)
                                }
                            >
                                <FaTimes />
                            </button>

                        </div>


                        <div className="startup-modal-body">

                            <div className="startup-detail-item">

                                <span>
                                    Industry
                                </span>

                                <strong>
                                    {
                                        selectedStartup.industry ||
                                        "N/A"
                                    }
                                </strong>

                            </div>


                            <div className="startup-detail-item">

                                <span>
                                    Description
                                </span>

                                <p>
                                    {
                                        selectedStartup.description ||
                                        "No description available"
                                    }
                                </p>

                            </div>


                            <div className="startup-detail-item">

                                <span>
                                    Website
                                </span>

                                {selectedStartup.website ? (

                                    <a
                                        href={
                                            selectedStartup.website
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {
                                            selectedStartup.website
                                        }
                                    </a>

                                ) : (

                                    <strong>
                                        N/A
                                    </strong>

                                )}

                            </div>

                        </div>


                        <div className="startup-modal-footer">

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() =>
                                    setSelectedStartup(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}