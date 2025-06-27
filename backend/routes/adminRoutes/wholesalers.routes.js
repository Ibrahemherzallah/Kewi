import express from "express";
import {
    addWholesaler,
    deleteWholesaler,
    getWholesalers,
    updateWholesaler
} from "../../controllers/wholesaler.controller.js";
import {authenticate} from "../../middleware/authMiddleware.js";

const router = express.Router();


router.get('/wholesalers', getWholesalers);
router.post("/wholesalers",authenticate, addWholesaler);
router.put("/wholesalers/:id",authenticate, updateWholesaler);
router.delete("/wholesalers/:id",authenticate, deleteWholesaler);

export default router;