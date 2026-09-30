import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import {

    getCategoryById,

    updateCategory

} from "../../../services/CategoryService";

export default function EditCategory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState(true);

    useEffect(() => {

        loadCategory();

    }, []);

    const loadCategory = async () => {

        const result = await getCategoryById(id);

        if (result.success) {

            setCategoryName(result.data.categoryName);

            setDescription(result.data.description);

            setStatus(result.data.status);

        }

        else {

            toast.error(result.message);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await updateCategory(id, {

            categoryName,

            description,

            status

        });

        if (result.success) {

            toast.success(result.message);

            navigate("/admin/categories");

        }

        else {

            toast.error(result.message);

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header">

                <h3>Edit Category</h3>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Category Name</label>

                        <input
                            className="form-control"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label>Description</label>

                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label>Status</label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value === "true")
                            }
                        >

                            <option value={true}>Active</option>

                            <option value={false}>Inactive</option>

                        </select>

                    </div>

                    <button className="btn btn-primary">

                        Update Category

                    </button>

                </form>

            </div>

        </div>

    );

}