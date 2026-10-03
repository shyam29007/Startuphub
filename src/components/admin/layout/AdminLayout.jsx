import { Navigate, Outlet } from "react-router-dom";

import AuthService from "../../../services/AuthService";

import AdminHeader from "./AdminHeader";

export default function AdminLayout() {

    const user = AuthService.getUser();

    // ==========================
    // CHECK LOGIN
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
    // CHECK ADMIN ROLE
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
    // ADMIN LAYOUT
    // ==========================

    return (

        <>

            <AdminHeader />

            <main className="admin-main-content">

                <Outlet />

            </main>

        </>

    );

}