import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import BusinessService from "../../../services/BusinessService";
import AuthService from "../../../services/AuthService";
import { uploadToCloudinary } from "../../../services/CloudinaryService";

export default function BusinessProfile() {

    const user = AuthService.getUser();

    console.log("USER =", user);

    const [businessId, setBusinessId] = useState(null);

    const [form, setForm] = useState({
        businessName: "",
        industry: "",
        description: "",
        website: "",
        logo: ""
    });

    const [logoFile, setLogoFile] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);


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
    // Logo Change
    // ==========================

    function logoHandler(e) {

        const file = e.target.files[0];

        if (!file) {
            return;
        }


        // Check image type

        if (!file.type.startsWith("image/")) {

            toast.error(
                "Please select an image file."
            );

            return;
        }


        // Check image size

        if (file.size > 5 * 1024 * 1024) {

            toast.error(
                "Logo must be less than 5MB."
            );

            return;
        }


        setLogoFile(file);


        // Preview

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

    }


    // ==========================
    // Load Business
    // ==========================

    async function loadBusiness() {

        try {

            const data =
                await BusinessService.getBusinessByFounder(
                    user.uid
                );


            if (data) {

                setBusinessId(data.id);


                setForm({

                    businessName:
                        data.businessName || "",

                    industry:
                        data.industry || "",

                    description:
                        data.description || "",

                    website:
                        data.website || "",

                    logo:
                        data.logo || ""

                });


                setPreview(
                    data.logo || ""
                );

            }

        }

        catch (err) {

            console.log(err);

            toast.error(
                err.message
            );

        }

    }


    // ==========================
    // Submit Form
    // ==========================

    async function submitForm(e) {

        e.preventDefault();

        setLoading(true);


        try {

            let logo =
                form.logo;


            // ==========================
            // Upload New Logo
            // ==========================

            if (logoFile) {

                toast.info(
                    "Uploading business logo..."
                );


                logo =
                    await uploadToCloudinary(
                        logoFile
                    );

            }


            // ==========================
            // Update Existing Business
            // ==========================

            if (businessId) {

                await BusinessService.updateBusiness(

                    businessId,

                    {
                        businessName:
                            form.businessName,

                        industry:
                            form.industry,

                        description:
                            form.description,

                        website:
                            form.website,

                        logo: logo

                    }

                );


                toast.success(
                    "Business Updated Successfully"
                );

            }


            // ==========================
            // Create New Business
            // ==========================

            else {

                const newBusiness =
                    await BusinessService.createBusiness({

                        founderId:
                            user.uid,

                        businessName:
                            form.businessName,

                        industry:
                            form.industry,

                        description:
                            form.description,

                        website:
                            form.website,

                        logo: logo

                    });


                // Save newly created ID

                setBusinessId(
                    newBusiness.id
                );


                toast.success(
                    "Business Created Successfully"
                );

            }


            // ==========================
            // Update UI
            // ==========================

            setForm({

                businessName:
                    form.businessName,

                industry:
                    form.industry,

                description:
                    form.description,

                website:
                    form.website,

                logo: logo

            });


            setPreview(logo);

            setLogoFile(null);

        }

        catch (err) {

            console.error(
                "BUSINESS ERROR =",
                err
            );

            toast.error(
                err.message
            );

        }

        finally {

            setLoading(false);

        }

    }


    // ==========================
    // Load On Page Open
    // ==========================

    useEffect(() => {

        loadBusiness();

    }, []);


    return (

        <>

            <Breadcrumb
                title="Business Profile"
                page="Business"
            />


            <div className="container py-5">


                {/* ==========================
                    PAGE HEADER
                ========================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Business Profile
                        </h2>

                        <p className="text-muted mb-0">
                            Manage your startup information
                        </p>

                    </div>

                </div>


                {/* ==========================
                    BUSINESS CARD
                ========================== */}

                <div className="card shadow border-0">


                    {/* HEADER */}

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">

                            {businessId
                                ? "Update Business"
                                : "Create Business"}

                        </h5>

                    </div>


                    {/* BODY */}

                    <div className="card-body p-4">


                        <form
                            onSubmit={submitForm}
                        >


                            {/* ==========================
                                BUSINESS LOGO
                            ========================== */}

                            <div className="text-center mb-4">

                                {preview ? (

                                    <img
                                        src={preview}
                                        alt="Business Logo"
                                        className="img-fluid"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "15px"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="bg-light d-flex align-items-center justify-content-center mx-auto"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            borderRadius: "15px"
                                        }}
                                    >

                                        <span className="text-muted">
                                            No Logo
                                        </span>

                                    </div>

                                )}

                            </div>


                            {/* ==========================
                                LOGO UPLOAD
                            ========================== */}

                            <div className="mb-4">

                                <label className="form-label fw-bold">

                                    Business Logo

                                </label>


                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={logoHandler}
                                />


                                <small className="text-muted">

                                    JPG, PNG or WEBP — maximum 5MB

                                </small>

                            </div>


                            {/* ==========================
                                BUSINESS NAME
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Business Name

                                </label>


                                <input
                                    type="text"
                                    className="form-control"
                                    name="businessName"
                                    value={form.businessName}
                                    onChange={changeHandler}
                                    placeholder="Enter business name"
                                    required
                                />

                            </div>


                            {/* ==========================
                                INDUSTRY
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Industry

                                </label>


                                <select
                                    className="form-select"
                                    name="industry"
                                    value={form.industry}
                                    onChange={changeHandler}
                                    required
                                >

                                    <option value="">
                                        Select Industry
                                    </option>

                                    <option value="IT">
                                        IT
                                    </option>

                                    <option value="Healthcare">
                                        Healthcare
                                    </option>

                                    <option value="Finance">
                                        Finance
                                    </option>

                                    <option value="Education">
                                        Education
                                    </option>

                                    <option value="E-Commerce">
                                        E-Commerce
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* ==========================
                                DESCRIPTION
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Description

                                </label>


                                <textarea
                                    rows="5"
                                    className="form-control"
                                    name="description"
                                    value={form.description}
                                    onChange={changeHandler}
                                    placeholder="Describe your business..."
                                />

                            </div>


                            {/* ==========================
                                WEBSITE
                            ========================== */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Website

                                </label>


                                <input
                                    type="url"
                                    className="form-control"
                                    name="website"
                                    value={form.website}
                                    onChange={changeHandler}
                                    placeholder="https://example.com"
                                />

                            </div>


                            {/* ==========================
                                SUBMIT
                            ========================== */}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : businessId
                                        ? "Update Business"
                                        : "Create Business"}

                            </button>


                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}