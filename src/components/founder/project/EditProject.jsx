import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";
import ProjectService from "../../../services/ProjectService";

export default function EditProject() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({

        title: "",

        category: "",

        description: "",

        skills: "",

        budget: "",

        deadline: ""

    });

    function changeHandler(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function loadProject() {

        try {

            const data =
                await ProjectService.getProject(id);

            setForm({

                title: data.title || "",

                category: data.category || "",

                description: data.description || "",

                skills: data.skills || "",

                budget: data.budget || "",

                deadline: data.deadline || ""

            });

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    async function submitForm(e) {

        e.preventDefault();

        try {

            await ProjectService.updateProject(
                id,
                form
            );

            toast.success(
                "Project Updated Successfully"
            );

            navigate("/founder/projects");

        }

        catch (err) {

            toast.error(err.message);

        }

    }

    useEffect(() => {

        loadProject();

    }, []);

    return (

        <>
            <Breadcrumb />

            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-header bg-warning">

                        <h4 className="mb-0">
                            Edit Project
                        </h4>

                    </div>

                    <div className="card-body">

                        <form onSubmit={submitForm}>

                            <div className="mb-3">

                                <label>
                                    Project Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={form.title}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Category
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    value={form.category}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="mb-3">

                                <label>
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

                                <label>
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="skills"
                                    value={form.skills}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Budget
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="budget"
                                    value={form.budget}
                                    onChange={changeHandler}
                                />

                            </div>

                            <div className="mb-4">

                                <label>
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="deadline"
                                    value={form.deadline}
                                    onChange={changeHandler}
                                />

                            </div>

                            <button
                                className="btn btn-warning"
                            >
                                Update Project
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}