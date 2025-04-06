import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import session from "express-session";


export const logIn = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Store user information in session
        req.session.user = {
            _id: user._id,
            userName: user.userName,
            isWholesaler: user.isWholesaler
        };
        console.log("the session is : " , session);
        const redirectUrl = user.isWholesaler ? "/" : "/admin/dashboard";

        return res.status(200).json({
            message: "Login successful",
            user: req.session.user,
            redirectUrl
        });

    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Error logging out" });
        }
        res.json({ message: "Logged out successfully" });
    });
};
