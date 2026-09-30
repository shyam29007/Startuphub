import { Navigate, Outlet } from "react-router-dom";

import AuthService from "../../../services/AuthService";

import DeveloperHeader from "./DeveloperHeader";

export default function DeveloperLayout() {

    const user = AuthService.getUser();


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
    // Check Developer Role
    // ==========================

    if (user.role !== "developer") {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );

    }


    // ==========================
    // Developer Layout
    // ==========================

    return (

        <>

            <DeveloperHeader />

            <Outlet />

        </>

    );

}