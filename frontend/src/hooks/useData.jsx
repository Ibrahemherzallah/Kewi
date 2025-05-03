import {useEffect, useState} from "react";

const useData = ({activeTab}) => {

    const [data, setData] = useState({ products: [], categories: [], brands: [], orders: [], wholesalers: [] });

    const fetchData = async (tab) => {
        try {
            let response;
            switch (tab) {
                case "products":
                    response = await fetch("https://kewi.ps/admin/products").then( response => response.json())
                    break;
                case "categories":
                    response = await fetch("https://kewi.ps/admin/categories").then( response => response.json())
                    break;
                case "brands":
                    response = await fetch("https://kewi.ps/admin/brands").then( response => response.json())
                    break;
                case "wholesalers":
                    response = await fetch("https://kewi.ps/admin/wholesalers").then( response => response.json())
                    break;
                default:
                    return;
            }

            const result = await response.json();
            setData((prevData) => ({ ...prevData, [tab]: result }));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(activeTab);
        }, [activeTab]
    );

    return {
        data
    }
}

export default useData;