import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Breadcrumb from "../../shared/Breadcrumb";

import AuthService from "../../../services/AuthService";
import UserService from "../../../services/UserService";
import { uploadToCloudinary } from "../../../services/CloudinaryService";

export default function EditDeveloperProfile() {

    const user = AuthService.getUser();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        profileImage: ""
    });

    const [imageFile, setImageFile] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================
    // Load Developer Profile
    // ==========================

    async function loadProfile() {

        try {

            const data =
                await UserService.getUser(user.uid);

            if (data) {

                setForm({
                    fullName: data.fullName || "",
                    phone: data.phone || "",
                    profileImage: data.profileImage || ""
                });

                setPreview(data.profileImage || "");

            }

        }

        catch (err) {

            toast.error(err.message);

        }

    }


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
    // Image Change
    // ==========================

    function imageHandler(e) {

        const file = e.target.files[0];

        if (!file) return;


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
                "Image must be less than 5MB."
            );

            return;

        }


        setImageFile(file);


        // Preview image

        const imageUrl =
            URL.createObjectURL(file);

        setPreview(imageUrl);

    }


    // ==========================
    // Submit
    // ==========================

    async function submitForm(e) {

        e.preventDefault();

        setLoading(true);

        try {

            let profileImage =
                form.profileImage;


            // Upload only if new image selected

            if (imageFile) {

                profileImage =
                    await uploadToCloudinary(
                        imageFile
                    );

            }


            // Update Firestore

            await UserService.updateUser(
                user.uid,
                {
                    fullName: form.fullName,
                    phone: form.phone,
                    profileImage
                }
            );


            // Update localStorage user

            const updatedUser = {

                ...user,

                fullName: form.fullName,

                phone: form.phone,

                profileImage

            };


            AuthService.setUser(updatedUser);


            toast.success(
                "Profile Updated Successfully"
            );


            setImageFile(null);

            setForm({
                fullName: form.fullName,
                phone: form.phone,
                profileImage
            });

            setPreview(profileImage);

        }

        catch (err) {

            toast.error(err.message);

        }

        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadProfile();

    }, []);


    return (

        <>

            <Breadcrumb
                title="Edit Developer Profile"
                page="Profile"
            />


            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-7">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h5 className="mb-0">
                                    Developer Profile
                                </h5>

                            </div>


                            <div className="card-body p-4">

                                <form
                                    onSubmit={submitForm}
                                >


                                    {/* Profile Image */}

                                    <div className="text-center mb-4">

                                        {preview ? (

                                            <img
                                                src={preview}
                                                alt="Profile"
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                    objectFit: "cover",
                                                    borderRadius: "50%"
                                                }}
                                            />

                                        ) : (

                                            <div
                                                className="bg-light d-flex align-items-center justify-content-center mx-auto"
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                    borderRadius: "50%"
                                                }}
                                            >
                                                No Image
                                            </div>

                                        )}

                                    </div>


                                    {/* Upload */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">

                                            Profile Picture

                                        </label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={imageHandler}
                                        />

                                        <small className="text-muted">

                                            JPG, PNG or WEBP — maximum 5MB

                                        </small>

                                    </div>


                                    {/* Name */}

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Full Name

                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            className="form-control"
                                            value={form.fullName}
                                            onChange={changeHandler}
                                            required
                                        />

                                    </div>


                                    {/* Phone */}

                                    <div className="mb-4">

                                        <label className="form-label">

                                            Phone

                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            value={form.phone}
                                            onChange={changeHandler}
                                        />

                                    </div>


                                    {/* Submit */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Updating..."
                                            : "Update Profile"}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}