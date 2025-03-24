import Category from "../models/category.model.js";
import {uploadCategoryImage} from "../utils/firebaseService.js";

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadCategoryImage(req.file);
        }

        const newCategory = new Category({
            name,
            image: imageUrl,
            description,
        });

        await newCategory.save();

        res.status(201).json(newCategory);
        console.log("Category and image stored successfully");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const updateCategory = async (req, res) => {
}


export const getCategories = async (req, res) => {
}


export const deleteCategory = async (req, res) => {

}

export const getHomeCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: error.message });
    }
};