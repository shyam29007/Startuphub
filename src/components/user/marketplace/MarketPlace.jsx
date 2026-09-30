import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProjectService from "../../../services/ProjectService";
import BusinessService from "../../../services/BusinessService";
import AuthService from "../../../services/AuthService";

export default function Marketplace() {

    const navigate = useNavigate();

    const user = AuthService.getUser();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================
    // LOAD PROJECTS
    // ==========================

    async function loadProjects() {

        try {

            const projectData =
                await ProjectService.getAllProjects();

            const projectsWithBusiness =
                await Promise.all(

                    projectData.map(async (project) => {

                        let business = null;

                        if (project.businessId) {

                            try {

                                business =
                                    await BusinessService.getBusiness(
                                        project.businessId
                                    );

                            } catch (err) {

                                console.log(
                                    "Business not found:",
                                    project.businessId
                                );

                            }

                        }

                        return {

                            ...project,

                            businessName:
                                business?.businessName ||
                                "Business Not Available",

                            businessLogo:
                                business?.logo || ""

                        };

                    })

                );


            setProjects(projectsWithBusiness);

        }

        catch (err) {

            console.error(
                "Marketplace Error:",
                err
            );

            toast.error(
                err.message ||
                "Unable to load marketplace."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // ==========================
    // APPLY
    // ==========================

    function handleApply(projectId) {

        // Visitor
        if (!user?.uid) {

            toast.info(
                "Please login as a developer to apply."
            );

            navigate("/login");

            return;

        }


        // Founder/Admin/other role
        if (user.role !== "developer") {

            toast.warning(
                "Only developers can apply for projects."
            );

            return;

        }


        // Developer
        navigate(
            `/developer/project/${projectId}`
        );

    }


    // ==========================
    // LOAD
    // ==========================

    useEffect(() => {

        loadProjects();

    }, []);


    // ==========================
    // LOADING
    // ==========================

    if (loading) {

        return (

            <div className="container py-5">

                <div className="text-center">

                    <h4>
                        Loading Marketplace...
                    </h4>

                </div>

            </div>

        );

    }


    return (

        <div className="container py-5">


            {/* ==========================
                HEADER
            ========================== */}

            <div className="text-center mb-5">

                <h5 className="fw-bold text-primary text-uppercase">

                    Marketplace

                </h5>

                <h1 className="fw-bold">

                    Discover Startup Projects

                </h1>

                <p className="text-muted">

                    Explore exciting startup projects
                    and find opportunities.

                </p>

            </div>


            {/* ==========================
                PROJECTS
            ========================== */}

            <div className="row g-4">

                {

                    projects.length > 0 ? (

                        projects.map((item) => (

                            <div
                                key={item.id}
                                className="col-md-6 col-lg-4"
                            >

                                <div
                                    className="card shadow border-0 h-100"
                                >


                                    <div className="card-body">


                                        {/* BUSINESS */}

                                        <div className="d-flex align-items-center mb-3">

                                            {

                                                item.businessLogo ? (

                                                    <img
                                                        src={item.businessLogo}
                                                        alt={item.businessName}
                                                        className="rounded-circle me-3"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            objectFit: "cover"
                                                        }}
                                                    />

                                                ) : (

                                                    <div
                                                        className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    >

                                                        🏢

                                                    </div>

                                                )

                                            }


                                            <div>

                                                <small className="text-muted">

                                                    Posted by

                                                </small>

                                                <div className="fw-bold">

                                                    {
                                                        item.businessName
                                                    }

                                                </div>

                                            </div>

                                        </div>


                                        <hr />


                                        {/* TITLE */}

                                        <h5 className="fw-bold">

                                            {item.title}

                                        </h5>


                                        {/* CATEGORY */}

                                        <p className="mb-2">

                                            <strong>
                                                Category:
                                            </strong>{" "}

                                            {
                                                item.category ||
                                                "Not specified"
                                            }

                                        </p>


                                        {/* SKILLS */}

                                        <p className="mb-2">

                                            <strong>
                                                Skills:
                                            </strong>{" "}

                                            {

                                                Array.isArray(
                                                    item.skills
                                                )

                                                    ? item.skills.join(", ")

                                                    : item.skills ||
                                                      "Not specified"

                                            }

                                        </p>


                                        {/* BUDGET */}

                                        <p className="mb-2">

                                            <strong>
                                                Budget:
                                            </strong>{" "}

                                            ₹ {item.budget || "0"}

                                        </p>


                                        {/* DEADLINE */}

                                        <p className="mb-3">

                                            <strong>
                                                Deadline:
                                            </strong>{" "}

                                            {
                                                item.deadline ||
                                                "Not specified"
                                            }

                                        </p>


                                        {/* STATUS */}

                                        <span className="badge bg-success">

                                            Open

                                        </span>

                                    </div>


                                    {/* FOOTER */}

                                    <div className="card-footer bg-white border-0 p-3">


                                        <button
                                            className="btn btn-primary w-100 mb-2"
                                            onClick={() =>
                                                navigate(
                                                    `/developer/project/${item.id}`
                                                )
                                            }
                                        >

                                            View Details

                                        </button>


                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() =>
                                                handleApply(
                                                    item.id
                                                )
                                            }
                                        >

                                            Apply Now

                                        </button>


                                        {

                                            !user?.uid && (

                                                <small className="text-muted d-block text-center mt-2">

                                                    Login as a developer
                                                    to apply

                                                </small>

                                            )

                                        }

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="col-12">

                            <div className="text-center py-5">

                                <h4>
                                    No Projects Available
                                </h4>

                                <p className="text-muted">

                                    There are currently no
                                    open startup projects.

                                </p>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}