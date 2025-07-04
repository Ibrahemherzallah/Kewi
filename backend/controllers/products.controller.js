import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {uploadBrandImage, uploadProductImages} from '../utils/firebaseService.js';
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

export const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate('categoryId')
            .populate('brandId');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await Product.find({ categoryId })
            .populate('categoryId')
            .populate('brandId');

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRelatedProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { excludeId } = req.query;

    try {
        const products = await Product.find({
            categoryId,
            _id: { $ne: excludeId } // Exclude the current product
        })
            .populate('categoryId')
            .populate('brandId')
            .limit(4); // Limit to 4 related products

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNewestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Newest first
            .limit(8)
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
            id,
            categoryId,
            brandId,
            gender,
            size,
            color,
            customerPrice,
            wholesalerPrice,
            stockNumber,
            isSoldOut = false,
            isOnSale = false,
            salePrice,
            numOfClicks = 0
        } = req.body;
        // Convert empty fields to null or default values to prevent validation errors
        const productData = {
            name: name || "",
            description: description || "",
            id: id || "",
            stockNumber: stockNumber || 0,
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

        const brandId = req.body.brandId?.id || req.body.brandId || existingProduct.brandId;
        const categoryId = req.body.categoryId?.id || req.body.categoryId || existingProduct.categoryId;


        const updatedData = {
            name: req.body.name || existingProduct.name,
            description: req.body.description || existingProduct.description,
            id: req.body.id || existingProduct.id,
            stockNumber: req.body.stockNumber || existingProduct.stockNumber,
            categoryId: mongoose.Types.ObjectId.isValid(categoryId) ? new mongoose.Types.ObjectId(categoryId) : existingProduct.categoryId,
            brandId: mongoose.Types.ObjectId.isValid(brandId) ? new mongoose.Types.ObjectId(brandId) : existingProduct.brandId,
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
        if (req.files && req.files[0]) {
            const imageUrl = await uploadProductImages(req.files, id); // Ensure we send only the first file
            updatedData.image = imageUrl;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
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