import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";
import BusinessService from "../../../services/BusinessService";

export default function EditBusiness() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({

        businessName: "",

        industry: "",

        description: "",

        website: "",

        logo: ""

    });

    function changeHandler(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function loadBusiness() {

        try {

            const business =
                await BusinessService.getBusiness(id);

            setForm({

                businessName:
                    business.businessName || "",

                industry:
                    business.industry || "",

                description:
                    business.description || "",

                website:
                    business.website || "",

                logo:
                    business.logo || ""

            });

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    async function submitForm(e) {

        e.preventDefault();

        try {

            await BusinessService.updateBusiness(
                id,
                form
            );

            toast.success(
                "Business Updated Successfully"
            );

            navigate("/founder/business");

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    useEffect(() => {

        loadBusiness();

    }, []);

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h4 className="mb-0">
                            Edit Business
                        </h4>

                    </div>

                    <div className="card-body">

                        <form onSubmit={submitForm}>

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
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Industry
                                </label>

                                <select
                                    className="form-select"
                                    name="industry"
                                    value={form.industry}
                                    onChange={changeHandler}
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
                                />

                            </div>

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
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Logo URL
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="logo"
                                    value={form.logo}
                                    onChange={changeHandler}
                                />

                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Update Business
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}