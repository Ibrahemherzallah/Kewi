import Product from "../models/product.model.js";
import uploadProductImages from '../utils/firebaseService.js';

export const getProducts = async (req, res) => {

}

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

        // Create a new product instance without images to get the product ID first
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
            image: [], // Empty for now, will update after upload
        });

        await newProduct.save();

        // Upload images to Firebase Storage
        const imageUrls = await uploadProductImages(req.files, newProduct._id.toString());

        // Update product with image URLs
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

}

export const deleteProduct = async (req, res) => {

}