import { Navigate, Outlet, useLocation } from "react-router-dom";

import AuthService from "../../../services/AuthService";

import AdminHeader from "./AdminHeader";
import AdminBreadcrumb from "./AdminBreadcrumb";

export default function AdminLayout() {

    const user = AuthService.getUser();

    const { pathname } = useLocation();


    // ==========================
    // Check Login
    // ==========================

    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ==========================
    // Check Admin Role
    // ==========================

    if (user.role !== "admin") {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );

    }


    // ==========================
    // Admin Layout
    // ==========================

    return (

        <>

            <AdminHeader />


            {/* 
                Hide breadcrumb only on Admin Dashboard.
                Other admin pages will still show it.
            */}

            {pathname !== "/admin" && (
                <AdminBreadcrumb />
            )}


            <div className="container-fluid py-5">

                <Outlet />

            </div>

        </>

    );

}