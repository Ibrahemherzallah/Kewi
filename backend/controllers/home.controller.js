export const getHome = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to the homepage!" });
    } catch (error) {
        console.error("Error fetching homepage content:", error);
        res.status(500).json({ error: error.message });
    }
};
