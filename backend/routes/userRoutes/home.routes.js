import express from 'express';
import {getCategories} from "../../controllers/categories.controller.js";
import {getNewestProducts} from "../../controllers/products.controller.js";


const router = express.Router();

router.get("/categories", getCategories);
router.get("/features", getNewestProducts);

export default router;