import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext.jsx";

const useUserData = (id) => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`https://kewi.ps/admin/users/${id}`)
            .then(response => response.json())
            .then(data =>
            {
                setUserData(data);
            })
    }, [user]);

    return userData;
};

export default useUserData;
