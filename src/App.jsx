import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/* =====================================================
   USER
===================================================== */

import Layout from "./components/user/layout/Layout";
import Home from "./components/user/Home";
import About from "./components/user/about/About";
import Contact from "./components/user/contact/Contact";
import Marketplace from "./components/user/marketplace/MarketPlace";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


/* =====================================================
   ADMIN
===================================================== */

import AdminLayout from "./components/admin/layout/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";



/* ================= CATEGORY ================= */

import ManageCategories from "./components/admin/category/ManageCategories";
import AddCategory from "./components/admin/category/AddCategory";
import EditCategory from "./components/admin/category/EditCategory";


/* ================= USERS ================= */

import ManageUsers from "./components/admin/users/ManageUsers";
import ViewUser from "./components/admin/users/ViewUser";
import EditUser from "./components/admin/users/EditUser";

import AdminStartups from "./components/admin/startups/AdminStartups";
import AdminProjects from "./components/admin/projects/AdminProjects";
import AdminApplications from "./components/admin/applications/AdminApplications";
/* =====================================================
   FOUNDER
===================================================== */

import FounderLayout from "./components/founder/layout/FounderLayout";

import FounderDashboard from "./components/founder/dashboard/FounderDashboard";

import BusinessProfile from "./components/founder/business/BusinessProfile";
import EditBusiness from "./components/founder/business/EditBusiness";

import ManageProjects from "./components/founder/project/ManageProjects";
import AddProject from "./components/founder/project/AddProject";
import EditProject from "./components/founder/project/EditProject";
import ViewProject from "./components/founder/project/ViewProject";

import ManageApplications from "./components/founder/applications/ManageApplications";
import ApplicationDetails from "./components/founder/applications/ApplicationDetails";

import FounderPayments from "./components/founder/payments/FounderPayments";


/* =====================================================
   DEVELOPER
===================================================== */

import DeveloperLayout from "./components/developer/layout/DeveloperLayout";
import DeveloperDashboard from "./components/developer/dashboard/DeveloperDashboard";

import BrowseProjects from "./components/developer/projects/BrowseProjects";
import ProjectDetails from "./components/developer/projects/ProjectDetails";

import MyApplications from "./components/developer/applications/MyApplications";

import DeveloperProfile from "./components/developer/profile/DeveloperProfile";
import EditDeveloperProfile from "./components/developer/profile/EditDeveloperProfile";


export default function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =====================================================
                    USER ROUTES
                ===================================================== */}

                <Route
                    path="/"
                    element={<Layout />}
                >

                    <Route
                        index
                        element={<Home />}
                    />

                    <Route
                        path="about"
                        element={<About />}
                    />

                    <Route
                        path="contact"
                        element={<Contact />}
                    />

                    <Route
                        path="/marketplace"
                        element={<Marketplace />}
                    />

                    <Route
                        path="login"
                        element={<Login />}
                    />

                    <Route
                        path="register"
                        element={<Register />}
                    />

                </Route>


                {/* =====================================================
                    ADMIN ROUTES
                ===================================================== */}

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    {/* Dashboard */}

                    <Route
                        index
                        element={<Dashboard />}
                    />


                    {/* ================= CATEGORY ================= */}

                    <Route
                        path="categories"
                        element={<ManageCategories />}
                    />

                    <Route
                        path="category/add"
                        element={<AddCategory />}
                    />

                    <Route
                        path="category/edit/:id"
                        element={<EditCategory />}
                    />


                    {/* ================= USERS ================= */}

                    <Route
                        path="users"
                        element={<ManageUsers />}
                    />

                    <Route
                        path="user/view/:id"
                        element={<ViewUser />}
                    />

                    <Route
                        path="user/edit/:id"
                        element={<EditUser />}
                    />

                    <Route
                        path="startups"
                        element={<AdminStartups />}
                    />

                    <Route
                        path="projects"
                        element={<AdminProjects />}
                    />

                    <Route
                        path="applications"
                        element={<AdminApplications />}
                    />

                </Route>


                {/* =====================================================
                    FOUNDER ROUTES
                ===================================================== */}

                <Route
                    path="/founder"
                    element={<FounderLayout />}
                >

                    {/* Dashboard */}

                    <Route
                        index
                        element={<FounderDashboard />}
                    />


                    {/* ================= BUSINESS ================= */}

                    <Route
                        path="business"
                        element={<BusinessProfile />}
                    />

                    <Route
                        path="business/edit/:id"
                        element={<EditBusiness />}
                    />


                    {/* ================= PROJECTS ================= */}

                    <Route
                        path="projects"
                        element={<ManageProjects />}
                    />

                    <Route
                        path="project/add"
                        element={<AddProject />}
                    />

                    <Route
                        path="project/edit/:id"
                        element={<EditProject />}
                    />

                    <Route
                        path="project/view/:id"
                        element={<ViewProject />}
                    />


                    {/* ================= APPLICATIONS ================= */}

                    <Route
                        path="applications"
                        element={<ManageApplications />}
                    />

                    <Route
                        path="application/:id"
                        element={<ApplicationDetails />}
                    />


                    {/* ================= PAYMENTS ================= */}

                    <Route
                        path="payments"
                        element={<FounderPayments />}
                    />

                </Route>


                {/* =====================================================
                    DEVELOPER ROUTES
                ===================================================== */}

                <Route
                    path="/developer"
                    element={<DeveloperLayout />}
                >

                    {/* Dashboard */}

                    <Route
                        index
                        element={<DeveloperDashboard />}
                    />


                    {/* ================= PROJECTS ================= */}

                    <Route
                        path="projects"
                        element={<BrowseProjects />}
                    />

                    <Route
                        path="project/:id"
                        element={<ProjectDetails />}
                    />


                    {/* ================= APPLICATIONS ================= */}

                    <Route
                        path="applications"
                        element={<MyApplications />}
                    />


                    {/* ================= PROFILE ================= */}

                    <Route
                        path="profile"
                        element={<DeveloperProfile />}
                    />

                    <Route
                        path="profile/edit"
                        element={<EditDeveloperProfile />}
                    />

                </Route>


            </Routes>


            {/* =====================================================
                TOAST CONTAINER
            ===================================================== */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />

        </BrowserRouter>

    );

}