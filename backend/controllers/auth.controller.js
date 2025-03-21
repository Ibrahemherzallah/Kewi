import bcrypt from "bcryptjs";
import User from "../models/users.model.js";

export const logIn = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const correctPass = await bcrypt.compare(password, user?.password || "");
        if (!user || !correctPass) {
            return res.status(404).json({error: "Invalid username or password"});
        } else {
            res.status(201).json({
                userName: userName,
                password: correctPass,
            })
        }
    } catch (e) {
        res.status(500).json({error: "Internal server error"});
        console.log("Error : ", e.message);
    }
}

export const logOut = (req, res) => {

}