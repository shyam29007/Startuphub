import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import BusinessModel from "../models/BusinessModel";

const COLLECTION_NAME = "businesses";

class BusinessService {

    // ==========================
    // Create Business
    // ==========================

    async createBusiness(data) {

        try {

            const business = {

                ...BusinessModel,

                founderId: data.founderId,

                businessName: data.businessName,

                description: data.description,

                industry: data.industry,

                website: data.website,

                logo: data.logo,

                // IMPORTANT:
                // Every newly created business
                // must wait for Admin approval.
                status: "pending",

                createdAt: serverTimestamp(),

                updatedAt: serverTimestamp()

            };

            const docRef = await addDoc(
                collection(db, COLLECTION_NAME),
                business
            );

            // Return Firestore document ID
            return {

                id: docRef.id,

                ...business

            };

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Get Business of Founder
    // ==========================

    async getBusinessByFounder(founderId) {

        try {

            const q = query(

                collection(db, COLLECTION_NAME),

                where(
                    "founderId",
                    "==",
                    founderId
                )

            );

            const snapshot = await getDocs(q);

            if (snapshot.empty) {

                return null;

            }

            const docItem = snapshot.docs[0];

            return {

                ...docItem.data(),

                id: docItem.id

            };

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Get Business By Id
    // ==========================

    async getBusiness(id) {

        try {

            const businessRef = doc(
                db,
                COLLECTION_NAME,
                id
            );

            const snapshot =
                await getDoc(businessRef);

            if (!snapshot.exists()) {

                throw new Error(
                    "Business not found"
                );

            }

            return {

                ...snapshot.data(),

                id: snapshot.id

            };

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Update Business
    // ==========================

    async updateBusiness(id, data) {

        try {

            const businessRef = doc(
                db,
                COLLECTION_NAME,
                id
            );

            await updateDoc(

                businessRef,

                {

                    businessName:
                        data.businessName,

                    description:
                        data.description,

                    industry:
                        data.industry,

                    website:
                        data.website,

                    logo:
                        data.logo,

                    // DO NOT allow Founder
                    // to change approval status.
                    updatedAt:
                        serverTimestamp()

                }

            );

        }

        catch (err) {

            throw new Error(err.message);

        }

    }


    // ==========================
    // Delete Business
    // ==========================

    async deleteBusiness(id) {

        try {

            await deleteDoc(

                doc(
                    db,
                    COLLECTION_NAME,
                    id
                )

            );

        }

        catch (err) {

            throw new Error(err.message);

        }

    }

}

export default new BusinessService();