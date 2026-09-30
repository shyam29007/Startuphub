import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import ApplicationService from "../../../services/ApplicationService";
import ProjectService from "../../../services/ProjectService";

export default function MyApplications() {

    const user = AuthService.getUser();

    const [applications, setApplications] = useState([]);

    async function loadApplications() {

        try {

            const data =
                await ApplicationService.getApplicationsByDeveloper(
                    user.uid
                );

            const applicationsWithProjects =
                await Promise.all(

                    data.map(async (application) => {

                        try {

                            const project =
                                await ProjectService.getProject(
                                    application.projectId
                                );

                            return {
                                ...application,
                                projectTitle: project.title
                            };

                        }

                        catch (err) {

                            return {
                                ...application,
                                projectTitle: "Project Not Found"
                            };

                        }

                    })

                );

            setApplications(applicationsWithProjects);

        }

        catch (err) {

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

                <div className="mb-4">

                    <h2 className="fw-bold">
                        My Applications
                    </h2>

                    <p className="text-muted">
                        Track the projects you have applied for
                    </p>

                </div>

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>
                                            Project
                                        </th>

                                        <th>
                                            Proposal
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        applications.length > 0 ? (

                                            applications.map((item) => (

                                                <tr key={item.id}>

                                                    <td>
                                                        <strong>
                                                            {item.projectTitle}
                                                        </strong>
                                                    </td>

                                                    <td>

                                                        {item.proposal
                                                            ? item.proposal.length > 60
                                                                ? item.proposal.substring(0, 60) + "..."
                                                                : item.proposal
                                                            : "No proposal"
                                                        }

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                item.status === "Accepted"
                                                                    ? "badge bg-success"
                                                                    : item.status === "Rejected"
                                                                        ? "badge bg-danger"
                                                                        : "badge bg-warning text-dark"
                                                            }
                                                        >
                                                            {item.status}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <Link
                                                            to={`/developer/project/${item.projectId}`}
                                                            className="btn btn-sm btn-info"
                                                        >
                                                            View Project
                                                        </Link>

                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center py-4"
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