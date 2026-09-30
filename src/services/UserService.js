import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";
import UserModel from "../models/UserModel";


const COLLECTION_NAME = "users";


class UserService {


    // ============================
    // Register User
    // ============================

    async register(data) {

        try {

            const response =
                await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );


            const uid = response.user.uid;


            const user = {

                ...UserModel,

                uid,

                fullName:
                    data.fullName,

                email:
                    data.email,

                phone:
                    data.phone,

                role:
                    data.role,

                status:
                    true,

                profileImage:
                    "",

                createdAt:
                    serverTimestamp(),

                updatedAt:
                    serverTimestamp()

            };


            await setDoc(
                doc(db, COLLECTION_NAME, uid),
                user
            );


            return user;

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Login User
    // ============================

    async login(data) {

        try {

            const response =
                await signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );


            const uid =
                response.user.uid;


            const docRef =
                doc(
                    db,
                    COLLECTION_NAME,
                    uid
                );


            const snap =
                await getDoc(docRef);


            if (!snap.exists()) {

                throw new Error(
                    "User not found."
                );

            }


            return {

                uid: snap.id,

                ...snap.data()

            };

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Get Single User
    // ============================

    async getUser(uid) {

        try {

            const userRef =
                doc(
                    db,
                    COLLECTION_NAME,
                    uid
                );


            const snap =
                await getDoc(userRef);


            if (!snap.exists()) {

                return null;

            }


            return {

                uid: snap.id,

                ...snap.data()

            };

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Get All Users
    // ============================

    async getAllUsers() {

        try {

            const snapshot =
                await getDocs(
                    collection(
                        db,
                        COLLECTION_NAME
                    )
                );


            const users = [];


            snapshot.forEach(
                (docItem) => {

                    users.push({

                        uid: docItem.id,

                        ...docItem.data()

                    });

                }
            );


            return users;

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Get Users By Role
    // ============================

    async getUsersByRole(role) {

        try {

            const q =
                query(

                    collection(
                        db,
                        COLLECTION_NAME
                    ),

                    where(
                        "role",
                        "==",
                        role
                    )

                );


            const snapshot =
                await getDocs(q);


            const users = [];


            snapshot.forEach(
                (docItem) => {

                    users.push({

                        uid: docItem.id,

                        ...docItem.data()

                    });

                }
            );


            return users;

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Update User
    // ============================

    async updateUser(uid, data) {

        try {

            const userRef =
                doc(
                    db,
                    COLLECTION_NAME,
                    uid
                );


            await updateDoc(
                userRef,
                {

                    ...data,

                    updatedAt:
                        serverTimestamp()

                }
            );

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Activate / Deactivate User
    // ============================

    async toggleUserStatus(uid, status) {

        try {

            const userRef =
                doc(
                    db,
                    COLLECTION_NAME,
                    uid
                );


            await updateDoc(
                userRef,
                {

                    status:
                        status,

                    updatedAt:
                        serverTimestamp()

                }
            );

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Delete User
    // ============================

    async deleteUser(uid) {

        try {

            await deleteDoc(

                doc(
                    db,
                    COLLECTION_NAME,
                    uid
                )

            );

        }

        catch (err) {

            throw new Error(
                err.message
            );

        }

    }


    // ============================
    // Logout
    // ============================

    async logout() {

        await signOut(auth);

    }

}


export default new UserService();