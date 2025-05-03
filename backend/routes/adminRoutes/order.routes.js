import express from 'express';
import {getPurchase} from "../../controllers/purchase.controller.js";
const router = express.Router();

router.get('/purchase', getPurchase);



export default router;