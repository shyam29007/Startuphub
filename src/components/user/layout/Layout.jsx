import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "../../shared/Breadcrumb";

import Chatbot from "../../chatbot/Chatbot";

import {
    Outlet,
    useLocation
} from "react-router-dom";


export default function Layout() {

    const location = useLocation();


    // Pages where breadcrumb should NOT appear

    const hideBreadcrumb =
        location.pathname === "/";


    return (

        <>

            {/* Header */}

            <Header />


            {/* Breadcrumb */}

            {!hideBreadcrumb && (
                <Breadcrumb />
            )}


            {/* Page Content */}

            <Outlet />


            {/* Footer */}

            <Footer />


            {/* AI Chatbot */}

            <Chatbot />

        </>

    );

}