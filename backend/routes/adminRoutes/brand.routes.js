import express from "express";
import {
    addBrand,
    deleteBrand,
    getBrands,
    incrementBrandClick,
    updateBrand
} from "../../controllers/brands.controller.js";
import multer from "multer";
import {authenticate} from "../../middleware/authMiddleware.js";

const storage = multer.memoryStorage(); // Stores files in memory
const upload = multer({ storage });

// Apply middleware to routes
const router = express.Router();

router.get('/brands', getBrands);
router.post("/brands",authenticate, upload.array("image"), addBrand);
router.put("/brands/:id",authenticate, upload.array("image"), updateBrand);
router.delete("/brands/:id",authenticate, deleteBrand);
router.patch('/brands/:id/click',authenticate, incrementBrandClick);


export default router;