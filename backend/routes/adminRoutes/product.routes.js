import express from 'express';
import {addProduct, deleteProduct, getProducts, updateProduct} from "../../controllers/products.controller.js";
import upload from "../../middleware/multerConfig.js";

const router = express.Router();

router.get('/products', getProducts);
router.post("/products", upload.array("images", 5), addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;