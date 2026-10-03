import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";



import UserService from "../../../services/UserService";


export default function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        phone: "",
        role: "",
        status: true

    });


    // ==========================
    // LOAD USER
    // ==========================

    async function loadUser() {

        try {

            setLoading(true);


            const foundUser =
                await UserService.getUser(id);


            if (!foundUser) {

                toast.error(
                    "User not found."
                );

                navigate(
                    "/admin/users"
                );

                return;

            }


            setFormData({

                fullName:
                    foundUser.fullName || "",

                email:
                    foundUser.email || "",

                phone:
                    foundUser.phone || "",

                role:
                    foundUser.role || "",

                status:
                    foundUser.status === true

            });

        }

        catch (err) {

            console.error(
                "LOAD USER ERROR =",
                err
            );

            toast.error(
                err.message ||
                "Unable to load user."
            );

        }

        finally {

            setLoading(false);

        }

    }


    // ==========================
    // INPUT CHANGE
    // ==========================

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;


        setFormData({

            ...formData,

            [name]: value

        });

    }


    // ==========================
    // STATUS CHANGE
    // ==========================

    function handleStatusChange(e) {

        setFormData({

            ...formData,

            status:
                e.target.value === "true"

        });

    }


    // ==========================
    // UPDATE USER
    // ==========================

    async function handleSubmit(e) {

        e.preventDefault();


        // Name validation

        if (!formData.fullName.trim()) {

            toast.warning(
                "Please enter user name."
            );

            return;

        }


        // Phone validation

        if (!formData.phone.trim()) {

            toast.warning(
                "Please enter phone number."
            );

            return;

        }


        // Role validation

        if (!formData.role) {

            toast.warning(
                "Please select a role."
            );

            return;

        }


        try {

            setSaving(true);


            await UserService.updateUser(

                id,

                {

                    fullName:
                        formData.fullName.trim(),

                    phone:
                        formData.phone.trim(),

                    role:
                        formData.role,

                    status:
                        formData.status

                }

            );


            toast.success(
                "User updated successfully."
            );


            setTimeout(() => {

                navigate(
                    `/admin/user/view/${id}`
                );

            }, 800);

        }

        catch (err) {

            console.error(
                "UPDATE USER ERROR =",
                err
            );

            toast.error(
                err.message ||
                "Unable to update user."
            );

        }

        finally {

            setSaving(false);

        }

    }


    // ==========================
    // LOAD ON PAGE
    // ==========================

    useEffect(() => {

        loadUser();

    }, [id]);


    // ==========================
    // LOADING
    // ==========================

    if (loading) {

        return (

            <>

                

                <div className="container py-5">

                    <h4 className="text-center">

                        Loading User...

                    </h4>

                </div>

            </>

        );

    }


    // ==========================
    // PAGE
    // ==========================

    return (

        <>

            


            <div className="container py-5">

                <div className="card shadow border-0">

                    <div className="card-body p-4">


                        {/* ==========================
                            HEADER
                        ========================== */}

                        <div className="mb-4">

                            <h2 className="fw-bold">

                                Edit User

                            </h2>

                            <p className="text-muted">

                                Update user account information.

                            </p>

                        </div>


                        <hr />


                        {/* ==========================
                            FORM
                        ========================== */}

                        <form
                            onSubmit={handleSubmit}
                        >


                            {/* NAME */}

                            <div className="mb-3">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Name

                                </label>


                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter user name"
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="mb-3">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Email

                                </label>


                                <input
                                    type="email"
                                    className="form-control"
                                    value={
                                        formData.email
                                    }
                                    disabled
                                />


                                <small className="text-muted">

                                    Email cannot be changed
                                    from the admin panel.

                                </small>

                            </div>


                            {/* PHONE */}

                            <div className="mb-3">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Phone

                                </label>


                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter phone number"
                                />

                            </div>


                            {/* ROLE */}

                            <div className="mb-3">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Role

                                </label>


                                <select
                                    name="role"
                                    className="form-select"
                                    value={
                                        formData.role
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select Role
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

                                </select>

                            </div>


                            {/* STATUS */}

                            <div className="mb-4">

                                <label
                                    className="form-label fw-semibold"
                                >

                                    Status

                                </label>


                                <select
                                    className="form-select"
                                    value={
                                        formData.status
                                            ? "true"
                                            : "false"
                                    }
                                    onChange={
                                        handleStatusChange
                                    }
                                >

                                    <option value="true">
                                        Active
                                    </option>

                                    <option value="false">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* BUTTONS */}

                            <div className="d-flex gap-2">


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Updating..."
                                        : "Update User"
                                    }

                                </button>


                                <Link
                                    to={`/admin/user/view/${id}`}
                                    className="btn btn-secondary"
                                >

                                    Cancel

                                </Link>


                            </div>


                        </form>

                    </div>

                </div>

            </div>

        </>

    );

}