import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";
import ProjectService from "../../../services/ProjectService";

export default function ViewProject() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    async function loadProject() {

        try {

            const data =
                await ProjectService.getProject(id);

            setProject(data);

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    useEffect(() => {

        loadProject();

    }, []);

    if (!project) {

        return (
            <div className="container py-5">
                Loading...
            </div>
        );

    }

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-header bg-info text-white">

                        <h3 className="mb-0">
                            Project Details
                        </h3>

                    </div>

                    <div className="card-body">

                        <div className="row g-4">

                            <div className="col-md-6">

                                <h6>Project Title</h6>

                                <p>{project.title}</p>

                            </div>

                            <div className="col-md-6">

                                <h6>Category</h6>

                                <p>{project.category}</p>

                            </div>

                            <div className="col-md-12">

                                <h6>Description</h6>

                                <p>{project.description}</p>

                            </div>

                            <div className="col-md-6">

                                <h6>Skills Required</h6>

                                <p>{project.skills}</p>

                            </div>

                            <div className="col-md-6">

                                <h6>Budget</h6>

                                <p>₹ {project.budget}</p>

                            </div>

                            <div className="col-md-6">

                                <h6>Deadline</h6>

                                <p>{project.deadline}</p>

                            </div>

                            <div className="col-md-3">

                                <h6>Work Status</h6>

                                <span className="badge bg-success">
                                    {project.workStatus}
                                </span>

                            </div>

                            <div className="col-md-3">

                                <h6>Payment Status</h6>

                                <span className="badge bg-warning text-dark">
                                    {project.paymentStatus}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}