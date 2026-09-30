import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";

export default function DeveloperProfile() {

    const user = AuthService.getUser();

    const [profile, setProfile] = useState(null);


    // ==========================
    // Load Developer Profile
    // ==========================

    async function loadProfile() {

        try {

            const data =
                await UserService.getUser(user.uid);

            if (!data) {

                toast.error(
                    "Developer profile not found."
                );

                return;

            }

            setProfile(data);

        }

        catch (err) {

            toast.error(err.message);

        }

    }


    useEffect(() => {

        loadProfile();

    }, []);


    // ==========================
    // Loading
    // ==========================

    if (!profile) {

        return (
            <>
                <Breadcrumb />

                <div className="container py-5">

                    <h4 className="text-center">
                        Loading Profile...
                    </h4>

                </div>
            </>
        );

    }


    return (

        <>

            <Breadcrumb
                title="Developer Profile"
                page="Profile"
            />


            <div className="container py-5">

                {/* ================= HEADER ================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Developer Profile
                        </h2>

                        <p className="text-muted mb-0">
                            Manage your developer information
                        </p>

                    </div>


                    <Link
                        to="/developer/profile/edit"
                        className="btn btn-primary"
                    >
                        Edit Profile
                    </Link>

                </div>


                {/* ================= PROFILE CARD ================= */}

                <div className="card shadow border-0">

                    <div className="card-body p-4">

                        <div className="row align-items-center">


                            {/* ================= IMAGE ================= */}

                            <div className="col-md-3 text-center mb-4 mb-md-0">

                                {
                                    profile.profileImage ? (

                                        <img
                                            src={profile.profileImage}
                                            alt="Developer"
                                            className="rounded-circle img-fluid"
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "cover"
                                            }}
                                        />

                                    ) : (

                                        <div
                                            className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                                            style={{
                                                width: "150px",
                                                height: "150px"
                                            }}
                                        >

                                            <span className="text-muted">
                                                No Image
                                            </span>

                                        </div>

                                    )
                                }

                            </div>


                            {/* ================= BASIC INFO ================= */}

                            <div className="col-md-9">

                                <h3 className="fw-bold">

                                    {profile.fullName}

                                </h3>


                                <p className="mb-2">

                                    <strong>
                                        Email:
                                    </strong>

                                    {" "}

                                    {profile.email}

                                </p>


                                <p className="mb-2">

                                    <strong>
                                        Phone:
                                    </strong>

                                    {" "}

                                    {profile.phone || "Not provided"}

                                </p>


                                <p className="mb-2">

                                    <strong>
                                        Role:
                                    </strong>

                                    {" "}

                                    <span className="badge bg-primary">

                                        {profile.role}

                                    </span>

                                </p>


                                <p className="mb-0">

                                    <strong>
                                        Status:
                                    </strong>

                                    {" "}

                                    {
                                        profile.status ? (

                                            <span className="badge bg-success">
                                                Active
                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">
                                                Inactive
                                            </span>

                                        )
                                    }

                                </p>

                            </div>

                        </div>


                        <hr className="my-4" />


                        {/* ================= ACCOUNT INFORMATION ================= */}

                        <h5 className="fw-bold mb-3">

                            Account Information

                        </h5>


                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <div className="border rounded p-3">

                                    <small className="text-muted">
                                        Full Name
                                    </small>

                                    <div className="fw-semibold">

                                        {profile.fullName || "Not provided"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6 mb-3">

                                <div className="border rounded p-3">

                                    <small className="text-muted">
                                        Email
                                    </small>

                                    <div className="fw-semibold">

                                        {profile.email || "Not provided"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6 mb-3">

                                <div className="border rounded p-3">

                                    <small className="text-muted">
                                        Phone
                                    </small>

                                    <div className="fw-semibold">

                                        {profile.phone || "Not provided"}

                                    </div>

                                </div>

                            </div>


                            <div className="col-md-6 mb-3">

                                <div className="border rounded p-3">

                                    <small className="text-muted">
                                        User ID
                                    </small>

                                    <div
                                        className="fw-semibold text-truncate"
                                        title={profile.uid}
                                    >

                                        {profile.uid}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}