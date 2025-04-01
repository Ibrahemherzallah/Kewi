import Category from "../models/category.model.js";
import {uploadBrandImage, uploadCategoryImage, uploadProductImages} from "../utils/firebaseService.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import Brand from "../models/brand.model.js";

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadCategoryImage(req.file);
        }

        console.log(imageUrl);

        const category = await Category.findOne({ name });
        if (category) {
            console.log("category exists");
            return res.status(400).json({ error: "category exists" });
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


export const getCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: error.message });
    }
}


export const updateCategory = async (req, res) => {
    console.log("The update method " , req.body);
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid category ID format" });
        }

        // Extract product data
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
        };

        // Handle images if provided
        if (req.files) {
            const imageUrl = await uploadCategoryImage(req.files[0]); // Fix: Send only the first file
            updatedData.image = imageUrl;
        }
        console.log("The update method " , req.body);

        const updatedProduct = await Category.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
        console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
}


export const deleteCategory = async (req, res) => {

    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
        console.log("Category deleted successfully");
    } catch (error) {
        console.error("Error deleting Category:", error);
        res.status(500).json({ error: error.message });
    }

}