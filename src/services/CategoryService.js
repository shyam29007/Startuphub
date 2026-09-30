import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const categoryCollection = collection(db, "categories");

// add categories
export const addCategory = async (category) => {
    try {

        // console.log("service recieved:,category")
        await addDoc(categoryCollection, {
            categoryName: category.categoryName,
            description: category.description,
            status: category.status,
            createdAt: serverTimestamp(),
        });
        // console.log("firestore adddoc success")

        return {
            success: true,
            message: "Category Added Successfully",
        };
    } 
    catch (error) {
        // console.log("firestore err")
        return {
            success: false,
            message: error.message,
        };
    }
};


// Get All Categories
export const getCategories = async () => {
    try {
        const snapshot = await getDocs(categoryCollection);

        const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return {
            success: true,
            data: categories,
        };
    } 
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

//edit by id

export const getCategoryById = async (id) => {

    try {

        const docRef = doc(db, "categories", id);

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {

            return {
                success: true,
                data: {
                    id: snapshot.id,
                    ...snapshot.data()
                }
            };

        }

        return {
            success: false,
            message: "Category not found"
        };

    }

    catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

};

//update

export const updateCategory = async (id, category) => {

    try {

        const docRef = doc(db, "categories", id);

        await updateDoc(docRef, {

            categoryName: category.categoryName,

            description: category.description,

            status: category.status

        });

        return {

            success: true,

            message: "Category Updated Successfully"

        };

    }

    catch (error) {

        return {

            success: false,

            message: error.message

        };

    }

};


// Delete Category
export const deleteCategory = async (id) => {
    try {

        await deleteDoc(doc(db, "categories", id));

        return {
            success: true,
            message: "Category Deleted Successfully"
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }
};


export const updateCategoryStatus = async (id, status) => {

    try {

        await updateDoc(doc(db, "categories", id), {
            status: !status
        });

        return {
            success: true,
            message: "Status Updated"
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

};