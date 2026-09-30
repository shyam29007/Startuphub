import { Navigate, Outlet } from "react-router-dom";

import AuthService from "../../../services/AuthService";

import FounderHeader from "./FounderHeader";

export default function FounderLayout() {

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
    // Check Founder Role
    // ==========================

    if (user.role !== "founder") {

        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );

    }


    // ==========================
    // Founder Layout
    // ==========================

    return (

        <>

            <FounderHeader />

            <Outlet />

        </>

    );

}