import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";

const useUserData = (id) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // ✅ If no ID, do nothing and return null
        if (!id) {
            setUserData(null);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`https://kewi.ps/admin/users/${id}`);
                if (!response.ok) throw new Error("Failed to fetch user");
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error loading user:", error);
                setUserData(null); // return null on error
            }
        };

        fetchUser();

    }, [id]);

    return userData;
};

export default useUserData;
