import style from "../components/card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "../components/icons/icons.jsx";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";


const ITEMS_PER_PAGE = 4;
const CARD_WIDTH = 220;

export function CategoryCards() {
    const [startIndex, setStartIndex] = useState(0);
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/user/categories")
            .then(response => response.json())
            .then(data =>
            {
                console.log("data is : " , data);
                setCategory(data);
                console.log("Cat is : " , categories);
            })
    },[])
    // Next function
    const handleNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex + ITEMS_PER_PAGE < categories.length ? prevIndex + ITEMS_PER_PAGE : 0
        );
    };

    // Previous function
    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex - ITEMS_PER_PAGE >= 0 ? prevIndex - ITEMS_PER_PAGE : categories.length - ITEMS_PER_PAGE
        );
    };

    return (
        <div className={`mt-5 ${style.categories}`} style={{ position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
            {/* Left Arrow */}
            <IconBtn
                onClick={handlePrev}
                style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                variant="circle"
                size="lg"
            >
                <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faChevronLeft} />
            </IconBtn>

            <motion.div
                className={style.cardWrapper}
                initial={{ x: 0 }}
                animate={{ x: -startIndex * CARD_WIDTH }}
                transition={{ type: "spring", stiffness: 50 }}
                style={{ display: "flex", gap: "10px" }}
            >
                {categories.map((category, index) => (
                    <button key={index} className={style.imageCardBtn} style={{ minWidth: `${CARD_WIDTH}px` }}>
                        <div className={style.imageCardContainer}>
                            <img className={style.imageCard} src={category.image} alt={category.name} />
                            <div className={style.overlay}>
                                <span className={style.overlayText}>{category.name}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </motion.div>

            {/* Right Arrow */}
            <IconBtn
                onClick={handleNext}
                style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                variant="circle"
                size="lg"
            >
                <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faChevronRight} />
            </IconBtn>
        </div>
    );
}
