import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";


export default function Login() {

    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function submitForm(e) {

        e.preventDefault();


        /* Email Regex */
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        /* Password Regex
           Minimum 8 characters
           At least 1 uppercase
           At least 1 lowercase
           At least 1 number
           At least 1 special character
        */
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        if (!email || !password) {

            toast.error("Please fill all fields");

            return;
        }


        /* Check Email */

        if (!emailRegex.test(email)) {

            toast.error("Please enter a valid email address");

            return;
        }


        /* Check Password */

        if (!passwordRegex.test(password)) {

            toast.error(
                "Password must contain 8 characters, uppercase, lowercase, number and special character"
            );

            return;
        }


        try {

            const user = await UserService.login({
                email,
                password
            });


            console.log(
                "User returned from Firestore:",
                user
            );


            AuthService.setUser(user);


            console.log(
                "LocalStorage user:",
                localStorage.getItem("user")
            );


            toast.success("Login Successful");


            // Navigate according to role

            switch (user.role) {

                case "admin":

                    nav("/admin");

                    break;


                case "founder":

                    nav("/founder");

                    break;


                case "developer":

                    nav("/developer");

                    break;


                default:

                    nav("/");

            }


        } catch (err) {

            toast.error(err.message);

        }

    }


    return (

        <div className="container py-5">


            <div
                className="section-title text-center position-relative pb-3 mb-5 mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <h5 className="fw-bold text-primary text-uppercase">

                    Login Account

                </h5>


                <h1 className="mb-0">

                    Welcome Back to StartupHub

                </h1>

            </div>



            <div className="row align-items-center">


                <div className="col-lg-6 text-center">

                </div>



                <div className="row justify-content-center">


                    <div className="col-lg-6 col-md-8 col-sm-10">


                        <div className="card shadow-lg border-0 rounded-4">


                            <div className="card-body p-5">


                                <form onSubmit={submitForm}>


                                    <div className="mb-4">

                                        <input

                                            type="email"

                                            className="form-control form-control-lg"

                                            placeholder="Enter Email"

                                            value={email}

                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }

                                            required

                                        />

                                    </div>



                                    <div className="mb-4">

                                        <input

                                            type="password"

                                            className="form-control form-control-lg"

                                            placeholder="Enter Password"

                                            value={password}

                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }

                                            required

                                        />

                                    </div>



                                    <button

                                        type="submit"

                                        className="btn btn-primary w-100 py-3"

                                    >

                                        Login

                                    </button>


                                </form>



                                <p className="text-center mt-4 mb-0">

                                    Don't have an account?


                                    <Link

                                        to="/register"

                                        className="ms-2 text-primary fw-bold text-decoration-none"

                                    >

                                        Register

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