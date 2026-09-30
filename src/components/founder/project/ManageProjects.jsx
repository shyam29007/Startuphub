import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import ProjectService from "../../../services/ProjectService";

export default function ManageProjects() {

    const user = AuthService.getUser();
    // console.log("USER =", user);
    // console.log("USER ID =", user?.id);
    // console.log("USER UID =", user?.uid);
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    async function loadProjects() {

        try {

            const data =
                await ProjectService.getProjectsByFounder(
                    user.uid
                );

            setProjects(data);

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    async function deleteProject(id) {

    const result = await Swal.fire({

        title: "Delete Project?",

        text: "You won't be able to recover this project!",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc3545",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Yes, Delete",

        cancelButtonText: "Cancel",

        reverseButtons: true

    });

    if (!result.isConfirmed) return;

    try {

        await ProjectService.deleteProject(id);

        toast.success("Project Deleted Successfully");

        loadProjects();

    }

    catch (err) {

        toast.error(err.message);

    }

    }

    useEffect(() => {

        loadProjects();

    }, []);

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            Manage Projects
                        </h2>

                        <p className="text-muted">
                            Manage all startup projects
                        </p>

                    </div>

                    <Link
                        to="/founder/project/add"
                        className="btn btn-primary"
                    >
                        + Add Project
                    </Link>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead>

                                    <tr>

                                        <th>Title</th>

                                        <th>Category</th>

                                        <th>Budget</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        projects.length > 0 ? (

                                            projects.map((item) => (

                                                <tr key={item.id}>

                                                    <td>
                                                        {item.title}
                                                    </td>

                                                    <td>
                                                        {item.category}
                                                    </td>

                                                    <td>
                                                        ₹ {item.budget}
                                                    </td>

                                                    <td>

                                                        <span className="badge bg-success">

                                                            {item.workStatus}

                                                        </span>

                                                    </td>

                                                   <td>

                                                        <div className="d-flex gap-2">

                                                            {/* View */}

                                                            <button
                                                                className="btn btn-info btn-sm text-white"
                                                                title="View Project"
                                                                onClick={() =>
                                                                    navigate(`/founder/project/view/${item.id}`)
                                                                }
                                                            >
                                                                <i className="bi bi-eye-fill"></i>
                                                            </button>

                                                            {/* Edit */}

                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                title="Edit Project"
                                                                onClick={() =>
                                                                    navigate(`/founder/project/edit/${item.id}`)
                                                                }
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>

                                                            {/* Delete */}

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                title="Delete Project"
                                                                onClick={() =>
                                                                    deleteProject(item.id)
                                                                }
                                                            >
                                                                <i className="bi bi-trash-fill"></i>
                                                            </button>

                                                        </div>

                                                    </td>
                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    No Projects Found
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