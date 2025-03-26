import mongoose from 'mongoose';
import Purchase from "../models/purchase.model.js";
import Order from "../models/order.model.js";


export const getOrders = async (req,res) => {
        console.log(mongoose.modelNames());
        try {
            const orders = await Order.find()
                .populate('productId')
                .populate('buyerId')
                .populate('purchaseId')
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }