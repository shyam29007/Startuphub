import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import { db } from "../../../firebase/firebaseConfig";

export default function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("all");

    const [statusFilter, setStatusFilter] = useState("all");


    // =====================================================
    // LOAD ALL USERS
    // =====================================================

    async function loadUsers() {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(db, "users")
            );

            const userData = [];

            snapshot.forEach((docItem) => {

                userData.push({

                    id: docItem.id,

                    ...docItem.data()

                });

            });

            setUsers(userData);

        }

        catch (error) {

            console.error(
                "LOAD USERS ERROR =",
                error
            );

            toast.error(
                error.message ||
                "Unable to load users."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // =====================================================
    // LOAD USERS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadUsers();

    }, []);


    // =====================================================
    // CHANGE USER STATUS
    // =====================================================

    async function changeStatus(user, newStatus) {

        const status =
            newStatus === "active";


        // =================================================
        // CONFIRM STATUS CHANGE
        // =================================================

        const result = await Swal.fire({

            title: status
                ? "Activate User?"
                : "Deactivate User?",

            text: status
                ? "This user will be activated."
                : "This user will be deactivated.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: status
                ? "Yes, Activate"
                : "Yes, Deactivate",

            cancelButtonText: "Cancel",

            reverseButtons: true

        });


        if (!result.isConfirmed) {

            return;

        }


        try {

            await updateDoc(

                doc(
                    db,
                    "users",
                    user.id
                ),

                {
                    status: status
                }

            );


            // =================================================
            // UPDATE UI IMMEDIATELY
            // =================================================

            setUsers(
                (previousUsers) =>

                    previousUsers.map(
                        (item) =>

                            item.id === user.id

                                ? {
                                    ...item,
                                    status: status
                                }

                                : item
                    )
            );


            Swal.fire({

                title: "Success!",

                text: status
                    ? "User activated successfully."
                    : "User deactivated successfully.",

                icon: "success",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(
                "STATUS UPDATE ERROR =",
                error
            );


            Swal.fire({

                title: "Error!",

                text:
                    error.message ||
                    "Unable to update user status.",

                icon: "error"

            });

        }

    }


    // =====================================================
    // DELETE USER
    // =====================================================

    async function deleteUser(user) {

        // =================================================
        // CONFIRM DELETE
        // =================================================

        const result = await Swal.fire({

            title: "Are you sure?",

            text:
                `You are about to delete ${user.fullName || user.name || "this user"}. This action cannot be undone.`,

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel",

            reverseButtons: true

        });


        if (!result.isConfirmed) {

            return;

        }


        try {

            // =================================================
            // DELETE FROM FIRESTORE
            // =================================================

            await deleteDoc(

                doc(
                    db,
                    "users",
                    user.id
                )

            );


            // =================================================
            // REMOVE FROM UI
            // =================================================

            setUsers(

                (previousUsers) =>

                    previousUsers.filter(
                        (item) =>
                            item.id !== user.id
                    )

            );


            // =================================================
            // SUCCESS ALERT
            // =================================================

            Swal.fire({

                title: "Deleted!",

                text:
                    "User has been deleted successfully.",

                icon: "success",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(
                "DELETE USER ERROR =",
                error
            );


            Swal.fire({

                title: "Error!",

                text:
                    error.message ||
                    "Unable to delete user.",

                icon: "error"

            });

        }

    }


    // =====================================================
    // FILTER USERS
    // =====================================================

    const filteredUsers = users.filter(
        (user) => {

            const name =
                user.fullName ||
                user.name ||
                "";


            const email =
                user.email ||
                "";


            const searchText =
                search
                    .toLowerCase()
                    .trim();


            // =================================================
            // SEARCH FILTER
            // =================================================

            const matchesSearch =

                name
                    .toLowerCase()
                    .includes(searchText)

                ||

                email
                    .toLowerCase()
                    .includes(searchText);


            // =================================================
            // ROLE FILTER
            // =================================================

            const matchesRole =

                roleFilter === "all"

                    ? true

                    : user.role === roleFilter;


            // =================================================
            // STATUS FILTER
            // =================================================

            const matchesStatus =

                statusFilter === "all"

                    ? true

                    : statusFilter === "active"

                        ? user.status === true

                        : user.status === false;


            return (

                matchesSearch &&

                matchesRole &&

                matchesStatus

            );

        }
    );


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="container-fluid py-5">

                <div className="text-center">

                    <h4>
                        Loading Users...
                    </h4>

                </div>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="container-fluid">


            {/* =================================================
                MANAGE USERS HEADER
            ================================================= */}

            <div className="card border-0 shadow-sm mb-3">

                <div className="card-body">


                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h5 className="fw-bold mb-1">

                                Manage Users

                            </h5>


                            <p className="text-muted mb-0">

                                View and manage all registered users.

                            </p>

                        </div>


                        <div>

                            <span className="badge bg-primary fs-6">

                                Total Users: {users.length}

                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        FILTERS
                    ================================================= */}

                    <div className="row g-3">


                        {/* SEARCH */}

                        <div className="col-md-4">

                            <input

                                type="text"

                                className="form-control"

                                placeholder="Search by Name or Email"

                                value={search}

                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }

                            />

                        </div>


                        {/* ROLE */}

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={roleFilter}

                                onChange={(event) =>
                                    setRoleFilter(
                                        event.target.value
                                    )
                                }

                            >

                                <option value="all">
                                    All Roles
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                                <option value="founder">
                                    Founder
                                </option>

                                <option value="developer">
                                    Developer
                                </option>

                                <option value="company">
                                    Company
                                </option>

                                <option value="user">
                                    User
                                </option>

                            </select>

                        </div>


                        {/* STATUS */}

                        <div className="col-md-4">

                            <select

                                className="form-select"

                                value={statusFilter}

                                onChange={(event) =>
                                    setStatusFilter(
                                        event.target.value
                                    )
                                }

                            >

                                <option value="all">
                                    All Status
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                USERS TABLE
            ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-0">


                    {filteredUsers.length === 0 ? (

                        <div className="text-center py-5">

                            <h5>
                                No Users Found
                            </h5>

                            <p className="text-muted">

                                No users match your search or filters.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">


                                {/* =================================================
                                    TABLE HEADER
                                ================================================= */}

                                <thead

                                    style={{
                                        backgroundColor: "#071d41",
                                        color: "white"
                                    }}

                                >

                                    <tr>

                                        <th className="px-3">
                                            S.No.
                                        </th>

                                        <th>
                                            Full Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                {/* =================================================
                                    TABLE BODY
                                ================================================= */}

                                <tbody>

                                    {filteredUsers.map(
                                        (user, index) => (

                                            <tr
                                                key={user.id}
                                            >


                                                {/* S.NO */}

                                                <td className="px-3">

                                                    {index + 1}

                                                </td>


                                                {/* NAME */}

                                                <td>

                                                    <strong>

                                                        {
                                                            user.fullName ||
                                                            user.name ||
                                                            "N/A"
                                                        }

                                                    </strong>

                                                </td>


                                                {/* EMAIL */}

                                                <td>

                                                    {
                                                        user.email ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* PHONE */}

                                                <td>

                                                    {
                                                        user.phone ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* ROLE */}

                                                <td>

                                                    <span

                                                        className="badge rounded-pill px-3 py-2"

                                                        style={{
                                                            backgroundColor:
                                                                "#2864df"
                                                        }}

                                                    >

                                                        {

                                                            user.role

                                                                ? user.role
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                                    +
                                                                    user.role.slice(1)

                                                                : "N/A"

                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span

                                                        className={

                                                            user.status === true

                                                                ? "badge bg-success rounded-pill px-3 py-2"

                                                                : "badge bg-danger rounded-pill px-3 py-2"

                                                        }

                                                    >

                                                        {

                                                            user.status === true

                                                                ? "Active"

                                                                : "Inactive"

                                                        }

                                                    </span>

                                                </td>


                                                {/* =================================================
                                                    ACTIONS
                                                ================================================= */}

                                                <td>

                                                    <div className="d-flex gap-2 align-items-center">


                                                        {/* =========================
                                                            VIEW
                                                        ========================= */}

                                                        <Link

                                                            to={`/admin/user/view/${user.id}`}

                                                            className="btn btn-info btn-sm text-white d-flex align-items-center justify-content-center"

                                                            title="View User"

                                                            style={{
                                                                width: "38px",
                                                                height: "38px"
                                                            }}

                                                        >

                                                            <FaEye size={16} />

                                                        </Link>


                                                        {/* =========================
                                                            EDIT
                                                        ========================= */}

                                                        <Link

                                                            to={`/admin/user/edit/${user.id}`}

                                                            className="btn btn-warning btn-sm text-white d-flex align-items-center justify-content-center"

                                                            title="Edit User"

                                                            style={{
                                                                width: "38px",
                                                                height: "38px"
                                                            }}

                                                        >

                                                            <FaEdit size={16} />

                                                        </Link>


                                                        {/* =========================
                                                            STATUS
                                                        ========================= */}

                                                        <select

                                                            className="form-select form-select-sm"

                                                            value={

                                                                user.status === true

                                                                    ? "active"

                                                                    : "inactive"

                                                            }

                                                            onChange={(event) =>
                                                                changeStatus(

                                                                    user,

                                                                    event.target.value

                                                                )
                                                            }

                                                            title="Change User Status"

                                                            style={{
                                                                width: "105px"
                                                            }}

                                                        >

                                                            <option value="active">
                                                                Active
                                                            </option>

                                                            <option value="inactive">
                                                                Inactive
                                                            </option>

                                                        </select>


                                                        {/* =========================
                                                            DELETE
                                                        ========================= */}

                                                        <button

                                                            type="button"

                                                            className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"

                                                            onClick={() =>
                                                                deleteUser(user)
                                                            }

                                                            title="Delete User"

                                                            style={{
                                                                width: "38px",
                                                                height: "38px"
                                                            }}

                                                        >

                                                            <FaTrash size={15} />

                                                        </button>


                                                    </div>

                                                </td>


                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                RESULT COUNT
            ================================================= */}

            <div className="mt-3 text-muted">

                Showing{" "}

                <strong>
                    {filteredUsers.length}
                </strong>

                {" "}of{" "}

                <strong>
                    {users.length}
                </strong>

                {" "}users

            </div>


        </div>

    );

}