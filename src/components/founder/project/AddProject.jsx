import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import BusinessService from "../../../services/BusinessService";
import AuthService from "../../../services/AuthService";
import ProjectService from "../../../services/ProjectService";

export default function AddProject() {

    // ==========================
    // Logged-in User
    // ==========================

    const user = AuthService.getUser();


    // ==========================
    // States
    // ==========================

    const [business, setBusiness] = useState(null);

    const [loadingBusiness, setLoadingBusiness] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);


    const [form, setForm] = useState({

        title: "",

        category: "",

        description: "",

        skills: "",

        budget: "",

        deadline: ""

    });


    // ==========================
    // Load Business
    // ==========================

    async function loadBusiness() {

        try {

            setLoadingBusiness(true);


            // Check user login

            if (!user?.uid) {

                toast.error(
                    "User session not found. Please login again."
                );

                return;

            }


            console.log(
                "===================================="
            );

            console.log(
                "LOGGED IN USER =",
                user
            );

            console.log(
                "LOGGED IN USER UID =",
                user.uid
            );


            // ==========================
            // Find Business
            // ==========================

            const data =
                await BusinessService.getBusinessByFounder(
                    user.uid
                );


            console.log(
                "BUSINESS FOUND =",
                data
            );


            // ==========================
            // Business doesn't exist
            // ==========================

            if (!data) {

                console.log(
                    "NO BUSINESS FOUND FOR UID =",
                    user.uid
                );

                setBusiness(null);

                return;

            }


            // ==========================
            // Check Business ID
            // ==========================

            if (!data.id) {

                console.error(
                    "BUSINESS FOUND BUT ID IS MISSING =",
                    data
                );

                toast.error(
                    "Business ID is missing."
                );

                setBusiness(null);

                return;

            }


            // ==========================
            // Business Found
            // ==========================

            console.log(
                "BUSINESS ID =",
                data.id
            );

            console.log(
                "BUSINESS NAME =",
                data.businessName
            );


            setBusiness(data);

        }

        catch (err) {

            console.error(
                "LOAD BUSINESS ERROR =",
                err
            );

            toast.error(
                err.message
            );

            setBusiness(null);

        }

        finally {

            setLoadingBusiness(false);

        }

    }


    // ==========================
    // Input Change
    // ==========================

    function changeHandler(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }


    // ==========================
    // Submit Project
    // ==========================

    async function submitForm(e) {

        e.preventDefault();


        // ==========================
        // Check User
        // ==========================

        if (!user?.uid) {

            toast.error(
                "User session not found. Please login again."
            );

            return;

        }


        // ==========================
        // Check Business
        // ==========================

        if (!business) {

            toast.error(
                "Please create your business profile first."
            );

            return;

        }


        // ==========================
        // Check Business ID
        // ==========================

        if (!business.id) {

            toast.error(
                "Business ID is missing."
            );

            return;

        }


        // ==========================
        // Validation
        // ==========================

        if (!form.title.trim()) {

            toast.warning(
                "Please enter project title."
            );

            return;

        }


        if (!form.category.trim()) {

            toast.warning(
                "Please enter project category."
            );

            return;

        }


        if (!form.description.trim()) {

            toast.warning(
                "Please enter project description."
            );

            return;

        }


        if (!form.skills.trim()) {

            toast.warning(
                "Please enter required skills."
            );

            return;

        }


        if (
            !form.budget ||
            Number(form.budget) <= 0
        ) {

            toast.warning(
                "Please enter a valid budget."
            );

            return;

        }


        if (!form.deadline) {

            toast.warning(
                "Please select project deadline."
            );

            return;

        }


        try {

            setSubmitting(true);


            // ==========================
            // Convert Skills to Array
            // ==========================

            const skillsArray =
                form.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "");


            // ==========================
            // Project Data
            // ==========================

            const projectData = {

                founderId: user.uid,

                businessId: business.id,

                title: form.title.trim(),

                category: form.category.trim(),

                description: form.description.trim(),

                skills: skillsArray,

                budget: form.budget,

                deadline: form.deadline

            };


            console.log(
                "===================================="
            );

            console.log(
                "CREATING PROJECT"
            );

            console.log(
                "Founder ID =",
                user.uid
            );

            console.log(
                "Business ID =",
                business.id
            );

            console.log(
                "Business Name =",
                business.businessName
            );

            console.log(
                "Project Data =",
                projectData
            );


            // ==========================
            // Create Project
            // ==========================

            await ProjectService.createProject(
                projectData
            );


            // ==========================
            // Success
            // ==========================

            toast.success(
                "Project Created Successfully!"
            );


            // ==========================
            // Reset Form
            // ==========================

            setForm({

                title: "",

                category: "",

                description: "",

                skills: "",

                budget: "",

                deadline: ""

            });

        }

        catch (err) {

            console.error(
                "CREATE PROJECT ERROR =",
                err
            );

            toast.error(
                err.message
            );

        }

        finally {

            setSubmitting(false);

        }

    }


    // ==========================
    // Load Business on Page Load
    // ==========================

    useEffect(() => {

        loadBusiness();

    }, []);


    // ==========================
    // Loading
    // ==========================

    if (loadingBusiness) {

        return (

            <>

                <Breadcrumb
                    title="Add Project"
                    page="Projects"
                />


                <div className="container py-5">

                    <div className="text-center">

                        <h4>
                            Loading Business...
                        </h4>

                        <p className="text-muted">
                            Checking your business profile.
                        </p>

                    </div>

                </div>

            </>

        );

    }


    // ==========================
    // Page
    // ==========================

    return (

        <>

            <Breadcrumb
                title="Add Project"
                page="Projects"
            />


            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">


                        {/* =================================
                            BUSINESS NOT FOUND
                        ================================= */}

                        {!business ? (

                            <div className="card shadow border-0">

                                <div className="card-header bg-primary text-white">

                                    <h4 className="mb-0">
                                        Add Project
                                    </h4>

                                </div>


                                <div className="card-body p-5 text-center">

                                    <h4 className="text-danger mb-3">

                                        Business Profile Required

                                    </h4>


                                    <p className="text-muted mb-4">

                                        You must create your business
                                        profile before creating a project.

                                    </p>


                                    <Link
                                        to="/founder/business"
                                        className="btn btn-primary"
                                    >

                                        Create Business Profile

                                    </Link>

                                </div>

                            </div>

                        ) : (


                            <>
                                {/* =================================
                                    BUSINESS INFORMATION
                                ================================= */}

                                <div className="alert alert-info mb-4">

                                    <h5 className="fw-bold">
                                        Business Information
                                    </h5>


                                    <p className="mb-1">

                                        <strong>
                                            Business:
                                        </strong>

                                        {" "}

                                        {business.businessName}

                                    </p>


                                    <p className="mb-1">

                                        <strong>
                                            Industry:
                                        </strong>

                                        {" "}

                                        {business.industry}

                                    </p>


                                    <p className="mb-0">

                                        <strong>
                                            Business ID:
                                        </strong>

                                        {" "}

                                        {business.id}

                                    </p>

                                </div>


                                {/* =================================
                                    PROJECT FORM
                                ================================= */}

                                <div className="card shadow border-0">

                                    <div className="card-header bg-primary text-white">

                                        <h4 className="mb-0">
                                            Add Project
                                        </h4>

                                    </div>


                                    <div className="card-body p-4">

                                        <form
                                            onSubmit={submitForm}
                                        >


                                            {/* PROJECT TITLE */}

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Project Title

                                                </label>

                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={form.title}
                                                    placeholder="Enter project title"
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                            </div>


                                            {/* CATEGORY */}

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Category

                                                </label>

                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={form.category}
                                                    placeholder="e.g. Web Development"
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                            </div>


                                            {/* DESCRIPTION */}

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Description

                                                </label>

                                                <textarea
                                                    rows="5"
                                                    name="description"
                                                    value={form.description}
                                                    placeholder="Describe your project..."
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                            </div>


                                            {/* SKILLS */}

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Required Skills

                                                </label>

                                                <input
                                                    type="text"
                                                    name="skills"
                                                    value={form.skills}
                                                    placeholder="React, Firebase, Node.js"
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                                <small className="text-muted">

                                                    Separate multiple skills
                                                    with commas.

                                                </small>

                                            </div>


                                            {/* BUDGET */}

                                            <div className="mb-3">

                                                <label className="form-label fw-semibold">

                                                    Budget (₹)

                                                </label>

                                                <input
                                                    type="number"
                                                    name="budget"
                                                    value={form.budget}
                                                    placeholder="Enter project budget"
                                                    min="1"
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                            </div>


                                            {/* DEADLINE */}

                                            <div className="mb-4">

                                                <label className="form-label fw-semibold">

                                                    Deadline

                                                </label>

                                                <input
                                                    type="date"
                                                    name="deadline"
                                                    value={form.deadline}
                                                    className="form-control"
                                                    onChange={changeHandler}
                                                />

                                            </div>


                                            {/* SUBMIT */}

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100"
                                                disabled={submitting}
                                            >

                                                {submitting

                                                    ? "Creating Project..."

                                                    : "Create Project"

                                                }

                                            </button>

                                        </form>

                                    </div>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}