import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const addWholesaler = async (req, res) => {
    try {
        const {userName, password, phone, address, isWholesaler} = await req.body;
        const user = await User.findOne({userName});
        if (user) {
            console.log("Username exist");
            return res.status(400).json({error: "Username exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            password: hashedPass,
            phone,
            address,
            isWholesaler
        })
        await newUser.save();
        if (newUser) {
            // generateTokenWithCookie(newUser._id,res);
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                password: newUser.password,
                phone: newUser.phone,
                address: newUser.address,
                isWholesaler: newUser.isWholesaler
            })
        }
        console.log("data stored successfully");
    } catch (e) {
        console.log("Error : ", e.message);
    }
}

export const deleteWholesaler = async (req, res) => {

}

export const updateWholesaler = async (req, res) => {

}

export const getWholesalers = async (req, res) => {

}