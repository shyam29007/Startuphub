import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: ""
    });

    function changeHandler(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function submitForm(e) {

        e.preventDefault();

        if (form.password !== form.confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            await UserService.register(form);

            toast.success("Registration Successful");
            setTimeout(() => {

                navigate("/login");

            }, 1500);

            setForm({
                fullName: "",
                phone: "",
                email: "",
                password: "",
                confirmpassword: "",
                role: ""
            });

        } catch (err) {

            toast.error(err.message);

        }
    }

    return (

        <div className="register-page">

            <div className="container py-5">

                <div
                    className="section-title text-center position-relative pb-3 mb-5 mx-auto"
                    style={{ maxWidth: "650px" }}
                >
                    <h5 className="fw-bold text-primary text-uppercase">
                        Register Account
                    </h5>

                    <h1 className="mb-0">
                        Join StartupHub Today
                    </h1>
                </div>

                <div className="row justify-content-center">

                    <div className="col-lg-7 col-md-8 col-sm-10">

                        <div className="card register-card border-0 shadow-lg">

                            <div className="card-body p-5">

                                <form onSubmit={submitForm}>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="tel"
                                            className="form-control form-control-lg"
                                            placeholder="Phone Number"
                                            name="phone"
                                            value={form.phone}
                                            onChange={changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Email Address"
                                            name="email"
                                            value={form.email}
                                            onChange={changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            name="password"
                                            value={form.password}
                                            onChange={changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Confirm Password"
                                            name="confirmpassword"
                                            value={form.confirmpassword}
                                            onChange={changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <select
                                            className="form-select form-select-lg"
                                            name="role"
                                            value={form.role}
                                            onChange={changeHandler}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Role
                                            </option>

                                            <option value="founder">
                                                Founder
                                            </option>

                                            <option value="developer">
                                                Developer
                                            </option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-3"
                                    >
                                        Create Account
                                    </button>

                                </form>

                                <p className="text-center mt-4 mb-0">

                                    Already have an account?

                                    <Link
                                        to="/login"
                                        className="ms-2 fw-bold text-primary text-decoration-none"
                                    >
                                        Login
                                    </Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}