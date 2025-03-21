import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {uploadProductImages} from '../utils/firebaseService.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            categoryId,
            brandId,
            gender,
            size,
            color,
            customerPrice,
            wholesalerPrice,
            isSoldOut,
            isOnSale,
            salePrice
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            categoryId,
            brandId,
            gender,
            size,
            color,
            customerPrice,
            wholesalerPrice,
            salePrice,
            isSoldOut,
            isOnSale,
            image: [],
        });

        await newProduct.save();

        const imageUrls = await uploadProductImages(req.files, newProduct._id.toString());

        newProduct.image = imageUrls;
        await newProduct.save();

        res.status(201).json(newProduct);
        console.log("Product and images stored successfully");
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({error: e.message});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }

        // Extract product data
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
            gender: req.body.gender,
            size: req.body.size,
            color: req.body.color,
            customerPrice: req.body.customerPrice,
            wholesalerPrice: req.body.wholesalerPrice,
            salePrice: req.body.salePrice,
            isSoldOut: req.body.isSoldOut,
            isOnSale: req.body.isOnSale,
        };

        // Handle images if provided
        if (req.files) {
            const imageUrls = await uploadProductImages(req.files, id);
            updatedData.image = imageUrls;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
        console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
        console.log("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: error.message });
    }
};
