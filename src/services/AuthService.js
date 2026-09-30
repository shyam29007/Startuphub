import { signOut } from "firebase/auth";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";


class AuthService {


    // ==========================
    // SAVE USER
    // ==========================

    setUser(user) {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

    }


    // ==========================
    // GET LOGGED-IN USER
    // ==========================

    getUser() {

        return JSON.parse(
            localStorage.getItem("user")
        );

    }


    // ==========================
    // GET ROLE
    // ==========================

    getRole() {

        const user = this.getUser();

        return user ? user.role : null;

    }


    // ==========================
    // CHECK LOGIN
    // ==========================

    isLoggedIn() {

        return this.getUser() !== null;

    }


    // ==========================
    // LOGOUT
    // ==========================

    async logout() {

        await signOut(auth);

        localStorage.removeItem("user");

        localStorage.removeItem("id");

    }


    // ==========================
    // GET USER ID
    // ==========================

    getId() {

        return localStorage.getItem("id");

    }


    // ==================================================
    // ADMIN USER MANAGEMENT
    // ==================================================


    // ==========================
    // GET ALL USERS
    // ==========================

    async getAllUsers() {

        const usersRef =
            collection(db, "users");

        const snapshot =
            await getDocs(usersRef);


        const users =
            snapshot.docs.map((document) => ({

                id: document.id,

                ...document.data()

            }));


        return users;

    }


    // ==========================
    // UPDATE USER
    // ==========================

    async updateUser(userId, data) {

        const userRef =
            doc(db, "users", userId);

        await updateDoc(
            userRef,
            data
        );

    }


    // ==========================
    // DELETE USER
    // ==========================

    async deleteUser(userId) {

        const userRef =
            doc(db, "users", userId);

        await deleteDoc(userRef);

    }


}


export default new AuthService();