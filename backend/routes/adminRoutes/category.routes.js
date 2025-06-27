import express from "express";
import {addCategory, deleteCategory, getCategories, updateCategory} from "../../controllers/categories.controller.js";
import multer from "multer";
import {authenticate} from "../../middleware/authMiddleware.js";
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


router.get('/categories', getCategories);
router.post("/categories",authenticate, upload.array("image"), addCategory);
router.put('/categories/:id',authenticate, upload.array("image"), updateCategory);
router.delete("/categories/:id",authenticate, deleteCategory);

export default router;