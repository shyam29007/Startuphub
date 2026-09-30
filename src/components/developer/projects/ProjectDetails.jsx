import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import ProjectService from "../../../services/ProjectService";
import BusinessService from "../../../services/BusinessService";
import ApplicationService from "../../../services/ApplicationService";

export default function ProjectDetails() {

    const { id } = useParams();

    const user = AuthService.getUser();


    const [project, setProject] = useState(null);

    const [business, setBusiness] = useState(null);

    const [alreadyApplied, setAlreadyApplied] =
        useState(false);

    const [proposal, setProposal] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [applying, setApplying] =
        useState(false);


    // ==========================
    // Load Project
    // ==========================

    async function loadProject() {

        try {

            const data =
                await ProjectService.getProject(id);

            setProject(data);


            // ==========================
            // Load Business
            // ==========================

            if (data.businessId) {

                try {

                    const businessData =
                        await BusinessService.getBusiness(
                            data.businessId
                        );

                    setBusiness(businessData);

                }

                catch (err) {

                    console.log(
                        "Business could not be loaded:",
                        err
                    );

                }

            }

        }

        catch (err) {

            console.error(
                "Load Project Error:",
                err
            );

            toast.error(
                err.message ||
                "Unable to load project."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // ==========================
    // Check Existing Application
    // ==========================

    async function checkApplication() {

        if (!user?.uid) {

            return;

        }

        try {

            const exists =
                await ApplicationService.checkExistingApplication(
                    id,
                    user.uid
                );

            setAlreadyApplied(exists);

        }

        catch (err) {

            console.error(
                "Application Check Error:",
                err
            );

        }

    }


    // ==========================
    // Apply For Project
    // ==========================

    async function applyProject() {


        // User check

        if (!user?.uid) {

            toast.error(
                "Please login as a developer first."
            );

            return;

        }


        // Already applied

        if (alreadyApplied) {

            toast.info(
                "You have already applied for this project."
            );

            return;

        }


        // Project status

        if (project.workStatus !== "Open") {

            toast.warning(
                "This project is no longer accepting applications."
            );

            return;

        }


        // Proposal validation

        if (!proposal.trim()) {

            toast.warning(
                "Please write a proposal before applying."
            );

            return;

        }


        try {

            setApplying(true);


            await ApplicationService.applyProject({

                projectId: project.id,

                founderId: project.founderId,

                developerId: user.uid,

                developerName: user.fullName,

                developerEmail: user.email,

                proposal: proposal.trim()

            });


            toast.success(
                "Application Submitted Successfully"
            );


            // Clear proposal

            setProposal("");


            // Change button immediately

            setAlreadyApplied(true);

        }

        catch (err) {

            console.error(
                "Application Error:",
                err
            );

            toast.error(
                err.message ||
                "Unable to submit application."
            );

        }

        finally {

            setApplying(false);

        }

    }


    // ==========================
    // Initial Load
    // ==========================

    useEffect(() => {

        loadProject();

        checkApplication();

    }, [id]);


    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <>

                <Breadcrumb
                    title="Project Details"
                    page="Project"
                />

                <div className="container py-5">

                    <h3 className="text-center">

                        Loading Project...

                    </h3>

                </div>

            </>

        );

    }


    // ==========================
    // Project Not Found
    // ==========================

    if (!project) {

        return (

            <>

                <Breadcrumb
                    title="Project Details"
                    page="Project"
                />

                <div className="container py-5">

                    <div className="alert alert-danger text-center">

                        Project not found.

                    </div>

                </div>

            </>

        );

    }


    return (

        <>

            <Breadcrumb
                title="Project Details"
                page="Project"
            />


            <div className="container py-5">


                <div className="card shadow border-0">


                    <div className="card-body p-4">


                        {/* ==========================
                            BUSINESS
                        ========================== */}

                        <div className="d-flex align-items-center mb-4">


                            {business?.logo ? (

                                <img
                                    src={business.logo}
                                    alt={business.businessName}
                                    className="rounded-circle me-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >

                                    🏢

                                </div>

                            )}


                            <div>

                                <small className="text-muted">

                                    Posted by

                                </small>

                                <h5 className="mb-0 fw-bold">

                                    {business?.businessName ||
                                        "Business Not Available"}

                                </h5>

                            </div>

                        </div>


                        <hr />


                        {/* ==========================
                            PROJECT TITLE
                        ========================== */}

                        <h2 className="fw-bold mb-3">

                            {project.title}

                        </h2>


                        {/* ==========================
                            STATUS
                        ========================== */}

                        <div className="mb-4">

                            <span
                                className={
                                    project.workStatus === "Open"
                                        ? "badge bg-success me-2"
                                        : "badge bg-secondary me-2"
                                }
                            >

                                {project.workStatus}

                            </span>


                            <span className="badge bg-warning text-dark">

                                Payment: {project.paymentStatus}

                            </span>

                        </div>


                        <hr />


                        {/* ==========================
                            CATEGORY
                        ========================== */}

                        <p>

                            <strong>
                                Category:
                            </strong>

                            {" "}

                            {project.category || "Not specified"}

                        </p>


                        {/* ==========================
                            BUDGET
                        ========================== */}

                        <p>

                            <strong>
                                Budget:
                            </strong>

                            {" "}

                            ₹ {project.budget || "0"}

                        </p>


                        {/* ==========================
                            SKILLS
                        ========================== */}

                        <p>

                            <strong>
                                Skills:
                            </strong>

                            {" "}

                            {Array.isArray(project.skills)
                                ? project.skills.join(", ")
                                : project.skills || "Not specified"}

                        </p>


                        {/* ==========================
                            DEADLINE
                        ========================== */}

                        <p>

                            <strong>
                                Deadline:
                            </strong>

                            {" "}

                            {project.deadline || "Not specified"}

                        </p>


                        {/* ==========================
                            DESCRIPTION
                        ========================== */}

                        <div className="mt-4">

                            <h5 className="fw-bold">

                                Project Description

                            </h5>

                            <p className="text-muted">

                                {project.description ||
                                    "No description provided."}

                            </p>

                        </div>


                        <hr />


                        {/* ==========================
                            APPLICATION
                        ========================== */}

                        <h5 className="mb-3">

                            Apply For This Project

                        </h5>


                        {alreadyApplied ? (

                            <div className="alert alert-success">

                                <strong>
                                    Application Submitted
                                </strong>

                                <br />

                                You have already applied
                                for this project.

                            </div>

                        ) : project.workStatus !== "Open" ? (

                            <div className="alert alert-secondary">

                                This project is no longer
                                accepting applications.

                            </div>

                        ) : (

                            <>

                                <textarea
                                    rows="6"
                                    className="form-control mb-3"
                                    placeholder="Write your proposal..."
                                    value={proposal}
                                    onChange={(e) =>
                                        setProposal(
                                            e.target.value
                                        )
                                    }
                                    disabled={applying}
                                />


                                <button
                                    className="btn btn-success"
                                    onClick={applyProject}
                                    disabled={applying}
                                >

                                    {applying
                                        ? "Submitting..."
                                        : "Apply Now"}

                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}