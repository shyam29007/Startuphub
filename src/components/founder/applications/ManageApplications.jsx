import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
    FaEye,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import ApplicationService from "../../../services/ApplicationService";

export default function ManageApplications() {

    const user = AuthService.getUser();

    const [applications, setApplications] = useState([]);

    async function loadApplications() {

        try {

            const data =
                await ApplicationService.getApplicationsByFounder(
                    user.uid
                );

            setApplications(data);

        } catch (err) {

            toast.error(err.message);

        }

    }

    async function updateStatus(id, status) {

        const result = await Swal.fire({

            title: `Are you sure?`,

            text: `You want to ${status} this application.`,

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor:
                status === "Accepted"
                    ? "#198754"
                    : "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText:
                status === "Accepted"
                    ? "Accept"
                    : "Reject"

        });

        if (!result.isConfirmed) return;

        try {

            await ApplicationService.updateStatus(
                id,
                status
            );

            toast.success(
                `Application ${status}`
            );

            loadApplications();

        } catch (err) {

            toast.error(err.message);

        }

    }

    useEffect(() => {

        loadApplications();

    }, []);

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            Manage Applications
                        </h2>

                        <p className="text-muted">
                            Review developer applications
                        </p>

                    </div>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>Developer</th>

                                        <th>Email</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        applications.length > 0 ? (

                                            applications.map((item) => (

                                                <tr key={item.id}>

                                                    <td>
                                                        {item.developerName}
                                                    </td>

                                                    <td>
                                                        {item.developerEmail}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${
                                                                item.status === "Accepted"
                                                                    ? "bg-success"
                                                                    : item.status === "Rejected"
                                                                    ? "bg-danger"
                                                                    : "bg-warning text-dark"
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <Link
                                                            to={`/founder/application/${item.id}`}
                                                            className="btn btn-sm btn-info me-2"
                                                            title="View"
                                                        >
                                                            <FaEye />
                                                        </Link>

                                                        <button
                                                            className="btn btn-sm btn-success me-2"
                                                            title="Accept"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Accepted"
                                                                )
                                                            }
                                                        >
                                                            <FaCheckCircle />
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            title="Reject"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    item.id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                        >
                                                            <FaTimesCircle />
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >
                                                    No Applications Found
                                                </td>

                                            </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}