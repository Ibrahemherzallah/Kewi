import express from "express";
import {addBrand, deleteBrand, getBrands, updateBrand} from "../../controllers/brands.controller.js";


router.get('/admin/Brands', getBrands);
router.post("/admin/Brands", addBrand);
router.put("/admin/Brands/:id", updateBrand);
router.delete("admin/Brands/:id", deleteBrand);

const router = express.Router();
