import { useEffect, useState } from "react";
import { getCategories,  updateCategoryStatus } from "../../../services/CategoryService";

import { deleteCategory } from "../../../services/CategoryService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom"; 

const ManageCategories = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;


    const loadCategories = async () => {
        const result = await getCategories();

        if (result.success) {
            setCategories(result.data);
        } else {
            console.log(result.message);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);


    const handleStatus = async (id, status) => {

    const result = await updateCategoryStatus(id, status);

    if (result.success) {

        loadCategories();

    } else {

        console.log(result.message);

    }

    };



   const handleDelete = async (id) => {

    const result = await Swal.fire({
        title: "Delete Category?",
        text: "You won't be able to recover this category!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true
    });

    if (!result.isConfirmed) return;

    const response = await deleteCategory(id);

    if (response.success) {

        toast.success(response.message);

        loadCategories();

    } else {

        toast.error(response.message);

    }

    };



    const filteredCategories = categories.filter((category) =>
    category.categoryName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;

    const currentCategories = filteredCategories.slice(
        firstIndex,
        lastIndex
    );

    const totalPages = Math.ceil(
        filteredCategories.length / recordsPerPage
    );




    return (
        <div className="container-fluid px-3 py-4">

            <div className="card shadow">

               <div className="card-header d-flex justify-content-between align-items-center">

                    <h3 className="mb-0">Manage Categories</h3>

                    <button
                        className="btn btn-info text-white"
                        onClick={() => navigate("/admin/category/add")}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Category
                    </button>

                </div>


                <div className="row mb-3">

                    <div className="col-md-4 ms-auto">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Category..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                    </div>

                </div>

                

                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>Serial No. </th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredCategories.length > 0 ? (
                                    currentCategories.map((category, index) => (
                                        <tr key={category.id}>
                                            <td>{firstIndex + index + 1}</td>
                                            <td>{category.categoryName}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <button
                                                    className={
                                                        category.status
                                                            ? "btn btn-success btn-sm"
                                                            : "btn btn-secondary btn-sm"
                                                    }
                                                    onClick={() =>
                                                        handleStatus(category.id, category.status)
                                                    }
                                                >
                                                    {category.status ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => navigate(`/admin/category/edit/${category.id}`)}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(category.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Categories Found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                        <div className="d-flex justify-content-center mt-4">

                            <nav>

                                <ul className="pagination">

                                    <li
                                        className={`page-item ${
                                            currentPage === 1 ? "disabled" : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => (

                                        <li
                                            key={index}
                                            className={`page-item ${
                                                currentPage === index + 1
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >

                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(index + 1)
                                                }
                                            >
                                                {index + 1}
                                            </button>

                                        </li>

                                    ))}

                                    <li
                                        className={`page-item ${
                                            currentPage === totalPages
                                                ? "disabled"
                                                : ""
                                        }`}
                                    >

                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ManageCategories;