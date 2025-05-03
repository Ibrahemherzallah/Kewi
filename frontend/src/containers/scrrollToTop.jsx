import { useLocation } from "react-router-dom";
import {useEffect} from "react";


const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, [location]);

    return null;
};

export default ScrollToTop;