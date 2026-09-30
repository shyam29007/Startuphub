import { useState } from "react";
import { toast } from "react-toastify";

import { addCategory } from "../../../services/CategoryService";

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Submit button clicked");
        

        if (!categoryName.trim()) {
            // console.log("category name id empty")
            toast.error("Category Name is required");
            return;
        }

        const category = {
            categoryName,
            description,
            status: true,
        };
        // console.log("category object:, category")

        const result = await addCategory(category);
        // console.log("service result")

        if (result.success) {
            toast.success(result.message);

            setCategoryName("");
            setDescription("");
        } 
        else {
            toast.error(result.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header">
                    <h3>Add Category</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Category Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-100 btn py-3 "
                            style={{  borderColor: "#20C4F4" }}
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;