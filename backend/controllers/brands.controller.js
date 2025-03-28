import Brand from "../models/brand.model.js";
import mongoose from "mongoose";
import {uploadBrandImage, uploadCategoryImage, uploadProductImages} from "../utils/firebaseService.js";
import User from "../models/users.model.js"; // Assuming same function works for brand images

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ error: error.message });
    }
};

export const addBrand = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request Files:", req.files);

        const { name } = req.body;
        const isFake = req.body.isFake === "true";

        console.log("Adding brand name:", name, "Is Fake:", isFake);

        const brand = await Brand.findOne({ name });
        if (brand) {
            console.log("brand exists");
            return res.status(400).json({ error: "brand exists" });
        }

        const newBrand = new Brand({
            name,
            isFake,
            image: ""
        });

        await newBrand.save();

        if (req.files && req.files.length > 0) {
            const imageUrl = await uploadBrandImage(req.files[0]); // Upload the first image
            newBrand.image = imageUrl;
            await newBrand.save();
        }

        res.status(201).json(newBrand);
        console.log("Brand stored successfully");
    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ error: e.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid brand ID format" });
        }

        const updatedData = {
            name: req.body.name,
            isFake: req.body.isFake
        };

        if (req.files) {
            const imageUrls = await uploadProductImages(req.files, id);
            updatedData.image = imageUrls[0] || "";
        }

        const updatedBrand = await Brand.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json(updatedBrand);
        console.log("Brand updated successfully:", updatedBrand);
    } catch (error) {
        console.error("Error updating brand:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json({ message: "Brand deleted successfully" });
        console.log("Brand deleted successfully");
    } catch (error) {
        console.error("Error deleting brand:", error);
        res.status(500).json({ error: error.message });
    }
};