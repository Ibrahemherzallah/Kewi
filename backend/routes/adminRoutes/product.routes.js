import express from 'express';
import {
    addProduct,
    deleteProduct,
    getProducts,
    getProductsByCategory, getProductsById, getRelatedProductsByCategory,
    updateProduct
} from "../../controllers/products.controller.js";
import upload from "../../middleware/multerConfig.js";
import {authenticate} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.get('/products/category/:categoryId', getProductsByCategory);
router.get('/related-products/category/:categoryId', getRelatedProductsByCategory);
router.post("/products",authenticate, upload.array("images", 10), addProduct);
router.put("/products/:id",authenticate, upload.array("images", 10), updateProduct);
router.delete("/products/:id",authenticate, deleteProduct);

export default router;