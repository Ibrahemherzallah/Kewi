import express from 'express';
import {
    addProduct,
    deleteProduct,
    getProducts,
    getProductsByCategory,
    updateProduct
} from "../../controllers/products.controller.js";
import upload from "../../middleware/multerConfig.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/category/:categoryId', getProductsByCategory);
router.post("/products", upload.array("images", 5), addProduct);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;