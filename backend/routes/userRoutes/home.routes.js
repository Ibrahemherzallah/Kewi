import express from 'express';
import {getCategories} from "../../controllers/categories.controller.js";


const router = express.Router();

router.get("/categories", getCategories);
// router.get("/features", getFeaturesProducts);

export default router;