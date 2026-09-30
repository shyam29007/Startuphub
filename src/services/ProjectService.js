import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import ProjectModel from "../models/ProjectModel";

const COLLECTION_NAME = "projects";

class ProjectService {

    // ==========================
    // Create Project
    // ==========================

    async createProject(data) {

        try {

            // Prevent project creation without business
            if (!data.businessId) {

                throw new Error(
                    "Business ID is missing. Please create your business first."
                );

            }

            if (!data.founderId) {

                throw new Error(
                    "Founder ID is missing."
                );

            }

            const project = {

                ...ProjectModel,

                founderId: data.founderId,

                businessId: data.businessId,

                title: data.title,

                category: data.category,

                description: data.description,

                skills: data.skills,

                budget: data.budget,

                deadline: data.deadline,

                workStatus: "Open",

                paymentStatus: "Unpaid",

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            };

            console.log(
                "PROJECT DATA BEFORE FIRESTORE =",
                project
            );

            const docRef = await addDoc(
                collection(db, COLLECTION_NAME),
                project
            );

            console.log(
                "PROJECT CREATED WITH ID =",
                docRef.id
            );

            return {
                id: docRef.id,
                ...project
            };

        }

        catch (err) {

            console.error(
                "CREATE PROJECT ERROR =",
                err
            );

            throw new Error(err.message);

        }

    }


    // ==========================
    // Get All Projects By Founder
    // ==========================

    async getProjectsByFounder(founderId) {

        try {

            const q = query(
                collection(db, COLLECTION_NAME),
                where("founderId", "==", founderId)
            );

            const snapshot = await getDocs(q);

            const projects = [];

            snapshot.forEach((docItem) => {

                projects.push({

                    id: docItem.id,

                    ...docItem.data()

                });

            });

            return projects;

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Get All Projects
    // ==========================

   async getAllProjects() {

        try {

            const q = query(
                collection(db, COLLECTION_NAME),
                where("workStatus", "==", "Open")
            );

            const snapshot = await getDocs(q);

            const projects = [];

            snapshot.forEach((docItem) => {

                projects.push({

                    id: docItem.id,

                    ...docItem.data()

                });

            });

            return projects;

        }

        catch (err) {

            console.error(
                "GET ALL PROJECTS ERROR =",
                err
            );

            throw new Error(err.message);

        }

    }


    // ==========================
    // Get Single Project
    // ==========================

    async getProject(id) {

        try {

            const projectRef = doc(
                db,
                COLLECTION_NAME,
                id
            );

            const snapshot = await getDoc(projectRef);

            if (!snapshot.exists()) {

                throw new Error(
                    "Project not found"
                );

            }

            return {

                id: snapshot.id,

                ...snapshot.data()

            };

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Update Project
    // ==========================

    async updateProject(id, data) {

        try {

            const projectRef = doc(
                db,
                COLLECTION_NAME,
                id
            );

            await updateDoc(projectRef, {

                title: data.title,

                category: data.category,

                description: data.description,

                skills: data.skills,

                budget: data.budget,

                deadline: data.deadline,

                updatedAt: serverTimestamp()

            });

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Delete Project
    // ==========================

    async deleteProject(id) {

        try {

            await deleteDoc(
                doc(db, COLLECTION_NAME, id)
            );

        }

        catch (err) {

            throw new Error(err.message);

        }

    }

    // ==========================
    // Get Open Projects
    // ==========================

    async getOpenProjects() {

        try {

            const q = query(
                collection(db, COLLECTION_NAME),
                where("workStatus", "==", "Open")
            );

            const snapshot = await getDocs(q);

            const projects = [];

            snapshot.forEach((docItem) => {

                projects.push({

                    id: docItem.id,

                    ...docItem.data()

                });

            });

            return projects;

        }

        catch (err) {

            console.error(
                "GET OPEN PROJECTS ERROR =",
                err
            );

            throw new Error(err.message);

        }

    }




}

export default new ProjectService();