import express from 'express';
import {getCategories} from "../../controllers/categories.controller.js";
import {getNewestProducts} from "../../controllers/products.controller.js";
import {addPurchase,sendWhatsAppMessage, updateStock} from "../../controllers/purchase.controller.js";
import {authenticate} from "../../middleware/authMiddleware.js";


const router = express.Router();

router.get("/categories", getCategories);
router.get("/features", getNewestProducts);
router.post('/purchase',authenticate, addPurchase);
router.post('/product/update-stock',authenticate, updateStock);
router.post('/purchase/send-whatsapp',authenticate, sendWhatsAppMessage );

export default router;