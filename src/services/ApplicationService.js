import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    getDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import ApplicationModel from "../models/ApplicationModel";

const COLLECTION_NAME = "applications";

class ApplicationService {

    // ==========================
    // Check Existing Application
    // ==========================

    async checkExistingApplication(projectId, developerId) {

        const q = query(
            collection(db, COLLECTION_NAME),
            where("projectId", "==", projectId),
            where("developerId", "==", developerId)
        );

        const snapshot = await getDocs(q);

        return !snapshot.empty;
    }

    // ==========================
    // Apply Project
    // ==========================

    async applyProject(data) {

        const application = {

            ...ApplicationModel,

            projectId: data.projectId,

            founderId: data.founderId,

            developerId: data.developerId,

            developerName: data.developerName,

            developerEmail: data.developerEmail,

            proposal: data.proposal,

            status: "Pending",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        };

        await addDoc(
            collection(db, COLLECTION_NAME),
            application
        );

    }

    // ==========================
    // Get Applications
    // ==========================

    async getApplicationsByFounder(founderId) {

        const q = query(
            collection(db, COLLECTION_NAME),
            where("founderId", "==", founderId)
        );

        const snapshot = await getDocs(q);

        let applications = [];

        snapshot.forEach((docItem) => {

            applications.push({

                id: docItem.id,

                ...docItem.data()

            });

        });

        return applications;

    }

    

    async getApplicationsByDeveloper(developerId) {

    const q = query(
        collection(db, COLLECTION_NAME),
        where("developerId", "==", developerId)
    );

    const snapshot = await getDocs(q);

    let applications = [];

    snapshot.forEach((docItem) => {

        applications.push({

            id: docItem.id,

            ...docItem.data()

        });

    });

    return applications;

    }

    async getApplication(id) {

        const snap = await getDoc(
            doc(db, COLLECTION_NAME, id)
        );

        return {
            id: snap.id,
            ...snap.data()
        };

    }

    async updateStatus(id, status) {

        await updateDoc(
            doc(db, COLLECTION_NAME, id),
            {
                status,
                updatedAt: serverTimestamp()
            }
        );

    }

}

export default new ApplicationService();