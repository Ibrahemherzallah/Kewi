import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {uploadProductImages} from '../utils/firebaseService.js';
import { bucket } from "../utils/firebaseConfig.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryId')
            .populate('brandId');

        res.json(products);
    } catch (error) {
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
            isSoldOut = false,
            isOnSale = false,
            salePrice,
            numOfClicks = 0
        } = req.body;
        console.log("The files is : " , req.files)
        // Convert empty fields to null or default values to prevent validation errors
        const productData = {
            name: name || "",
            description: description || "",
            categoryId: mongoose.Types.ObjectId.isValid(categoryId) ? new mongoose.Types.ObjectId(categoryId) : null,  // Convert categoryId to ObjectId
            brandId: mongoose.Types.ObjectId.isValid(brandId) ? new mongoose.Types.ObjectId(brandId) : null,  // Convert brandId to ObjectId
            gender: gender || null,  // Allow gender to be optional
            size: size || null,
            color: color || "",
            customerPrice: customerPrice ? Number(customerPrice) : 0,
            wholesalerPrice: wholesalerPrice ? Number(wholesalerPrice) : 0,
            salePrice: salePrice ? Number(salePrice) : null,
            isSoldOut: isSoldOut === "true",
            isOnSale: isOnSale === "true",
            numOfClicks: Number(numOfClicks),
            image: [],
        };
        const newProduct = new Product(productData);
        await newProduct.save();

        const imageUrls = await uploadProductImages(req.files, newProduct._id.toString());
        newProduct.image = imageUrls;
        await newProduct.save();

        res.status(201).json(newProduct);
        console.log("Product and images stored successfully");
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ error: e.message });
    }
};

export const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID format" });
        }
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        let categoryId = req.body.categoryId;


        const updatedData = {
            name: req.body.name || existingProduct.name,
            description: req.body.description || existingProduct.description,
            categoryId: req.body.categoryId || existingProduct.categoryId || null,
            brandId: req.body.brandId || existingProduct.brandId || null,
            gender: req.body.gender || existingProduct.gender,
            size: req.body.size || existingProduct.size,
            color: req.body.color || existingProduct.color,
            customerPrice: req.body.customerPrice || existingProduct.customerPrice,
            wholesalerPrice: req.body.wholesalerPrice || existingProduct.wholesalerPrice,
            salePrice: req.body.salePrice || existingProduct.salePrice,
            isSoldOut: req.body.isSoldOut ?? existingProduct.isSoldOut,
            isOnSale: req.body.isOnSale ?? existingProduct.isOnSale,
            image: existingProduct.image,
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





export const extractPathFromUrl = (url) => {
    try {
        const decodedUrl = decodeURIComponent(url);
        const matches = decodedUrl.match(/\/o\/(.*?)\?alt=media/);
        if (matches && matches[1]) {
            return matches[1]; // This is the path inside the bucket
        }
    } catch (err) {
        console.error("Failed to extract path:", err.message);
    }
    return null;
};



export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Delete all images in product_images/{productId}/
        const [files] = await bucket.getFiles({ prefix: `product_images/${id}/` });
        const deletePromises = files.map(file => file.delete());
        await Promise.all(deletePromises);

        // Delete product from DB
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product and images deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ error: error.message });
    }
};