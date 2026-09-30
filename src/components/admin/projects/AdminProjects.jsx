import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig.js";
import { FaProjectDiagram, FaSearch } from "react-icons/fa";

import "./AdminProjects.css";

export default function AdminProjects() {

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {

        try {

            setLoading(true);

            const snapshot = await getDocs(
                collection(db, "projects")
            );

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setProjects(data);

        } catch (error) {

            console.error("Error loading projects:", error);

        } finally {

            setLoading(false);

        }
    };

    const filteredProjects = projects.filter((project) => {

        const text = search.toLowerCase();

        return (
            String(project.title || project.name || "")
                .toLowerCase()
                .includes(text) ||
            String(project.description || "")
                .toLowerCase()
                .includes(text)
        );

    });

    if (loading) {

        return (
            <div className="admin-page-loading">
                Loading Projects...
            </div>
        );

    }

    return (

        <div className="admin-projects-page">

            <div className="admin-projects-header">

                <div>

                    <h2>
                        Manage Projects
                    </h2>

                    <p>
                        View and manage all projects created on StartupHub.
                    </p>

                </div>

                <div className="projects-count">

                    Total Projects: {projects.length}

                </div>

            </div>


            <div className="projects-search">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            <div className="projects-table-container">

                <table className="projects-table">

                    <thead>

                        <tr>

                            <th>S.No.</th>
                            <th>Project</th>
                            <th>Founder</th>
                            <th>Category</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredProjects.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="empty-projects"
                                >
                                    <FaProjectDiagram />

                                    <p>
                                        No Projects Found
                                    </p>

                                </td>

                            </tr>

                        ) : (

                            filteredProjects.map((project, index) => (

                                <tr key={project.id}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>

                                        <strong>
                                            {project.title ||
                                                project.name ||
                                                "Untitled Project"}
                                        </strong>

                                        <small>
                                            {project.description || "No description"}
                                        </small>

                                    </td>

                                    <td>
                                        {project.founderName ||
                                            project.founderEmail ||
                                            "N/A"}
                                    </td>

                                    <td>
                                        {project.category || "N/A"}
                                    </td>

                                    <td>

                                        <span className="project-status">
                                            {project.status || "Active"}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}