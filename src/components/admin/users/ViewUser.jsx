import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import UserService from "../../../services/UserService";

export default function ViewUser() {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // ==========================
    // LOAD USER
    // ==========================

    async function loadUser() {

        try {

            setLoading(true);

            const data = await UserService.getUser(id);

            if (!data) {

                toast.error("User not found.");

                return;
            }

            setUser(data);

        } catch (err) {

            console.error(
                "LOAD USER ERROR =",
                err
            );

            toast.error(
                err.message ||
                "Unable to load user."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================
    // LOAD PAGE
    // ==========================

    useEffect(() => {

        loadUser();

    }, [id]);


    // ==========================
    // LOADING
    // ==========================

    if (loading) {

        return (

            <div className="container py-5">

                <div className="text-center">

                    <h4>
                        Loading User...
                    </h4>

                </div>

            </div>

        );

    }


    // ==========================
    // USER NOT FOUND
    // ==========================

    if (!user) {

        return (

            <div className="container py-5">

                <div className="text-center">

                    <h4>
                        User Not Found
                    </h4>

                    <Link
                        to="/admin/users"
                        className="btn btn-primary mt-3"
                    >
                        ← Back to Users
                    </Link>

                </div>

            </div>

        );

    }


    // ==========================
    // USER DETAILS
    // ==========================

    return (

        <div className="container py-5">

            <div className="card shadow border-0">

                <div className="card-body p-4">


                    {/* ==========================
                        HEADER
                    ========================== */}

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">
                                User Details
                            </h2>

                            <p className="text-muted mb-0">
                                View complete user information.
                            </p>

                        </div>


                        {/* EDIT USER */}

                        <Link
                            to={`/admin/user/edit/${user.uid}`}
                            className="btn btn-primary"
                        >
                            Edit User
                        </Link>

                    </div>


                    <hr />


                    {/* ==========================
                        USER INFORMATION
                    ========================== */}

                    <div className="row g-4">


                        {/* NAME */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Name
                            </label>

                            <p className="form-control bg-light">

                                {user.fullName || "N/A"}

                            </p>

                        </div>


                        {/* EMAIL */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Email
                            </label>

                            <p className="form-control bg-light">

                                {user.email || "N/A"}

                            </p>

                        </div>


                        {/* PHONE */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Phone
                            </label>

                            <p className="form-control bg-light">

                                {user.phone || "N/A"}

                            </p>

                        </div>


                        {/* ROLE */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Role
                            </label>

                            <p>

                                <span className="badge bg-primary fs-6">

                                    {user.role || "N/A"}

                                </span>

                            </p>

                        </div>


                        {/* STATUS */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Status
                            </label>

                            <p>

                                {user.status === true ? (

                                    <span className="badge bg-success fs-6">
                                        Active
                                    </span>

                                ) : (

                                    <span className="badge bg-danger fs-6">
                                        Inactive
                                    </span>

                                )}

                            </p>

                        </div>


                        {/* USER ID */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                User ID
                            </label>

                            <p
                                className="form-control bg-light text-truncate"
                                title={user.uid}
                            >

                                {user.uid || "N/A"}

                            </p>

                        </div>


                        {/* CREATED AT */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Created At
                            </label>

                            <p className="form-control bg-light">

                                {user.createdAt?.toDate
                                    ? user.createdAt
                                        .toDate()
                                        .toLocaleString()
                                    : user.createdAt || "N/A"
                                }

                            </p>

                        </div>


                        {/* UPDATED AT */}

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Updated At
                            </label>

                            <p className="form-control bg-light">

                                {user.updatedAt?.toDate
                                    ? user.updatedAt
                                        .toDate()
                                        .toLocaleString()
                                    : user.updatedAt || "N/A"
                                }

                            </p>

                        </div>

                    </div>


                    <hr />


                    {/* ==========================
                        BACK BUTTON
                    ========================== */}

                    <Link
                        to="/admin/users"
                        className="btn btn-secondary"
                    >
                        ← Back
                    </Link>


                </div>

            </div>

        </div>

    );

}