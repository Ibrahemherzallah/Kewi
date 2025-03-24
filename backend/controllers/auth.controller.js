import bcrypt from "bcryptjs";
import User from "../models/users.model.js";


export const logIn = async (req, res) => {
    console.log(req.body);
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        console.log("The user is  : ", user)

        if (!user) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        const correctPass = await bcrypt.compare(password, user.password);
        console.log("The correctPass is  : ", correctPass)

        if (!correctPass) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Store user information in session
        req.session.user = {
            _id: user._id,
            userName: user.userName,
            isWholesaler: user.isWholesaler
        };

        const redirectUrl = user.isWholesaler ? "/home" : "/admin/dashboard";

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
