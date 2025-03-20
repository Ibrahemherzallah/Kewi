import express from "express";
import {addCategory, deleteCategory, getCategories, updateCategory} from "../../controllers/categories.controller.js";

const router = express.Router();


router.get('/admin/Categories', getCategories);
router.post("/admin/Categories", addCategory);
router.put("/admin/Categories/:id", updateCategory);
router.delete("admin/Categories/:id", deleteCategory);

export default router;