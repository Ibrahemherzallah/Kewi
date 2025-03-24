export const checkAuth = (req, res, next) => {
    console.log("The middleware is : " , req.session);
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    next();
};