import express from 'express';
import {adminDashboard} from "../../controllers/adminDash.controller.js";

const router = express.Router();

router.get('/admin/dashboard', adminDashboard);

export default router;