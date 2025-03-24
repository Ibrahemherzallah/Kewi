import express from 'express';
import { getHome } from '../../controllers/home.controller.js';
import { getHomeCategories } from '../../controllers/categories.controller.js';
import { getFeaturesProducts } from '../../controllers/products.controller.js';

const router = express.Router();

router.get("/", getHome);
router.get("/categories", getHomeCategories);
router.get("/features", getFeaturesProducts);

export default router;