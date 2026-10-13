import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import DeveloperHeader from "./DeveloperHeader";
import "./DeveloperLayout.css";

export default function DeveloperLayout() {
    const user = AuthService.getUser();
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "developer") return <Navigate to="/unauthorized" replace />;

    return (
        <div className="developer-layout">
            <DeveloperHeader />
            <main className="developer-main"><Outlet /></main>
        </div>
    );
}
