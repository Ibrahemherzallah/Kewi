import style from "../components/card/card.module.css";
import bagImg from "../assets/handbag.jpg";
import accessory from "../assets/accessory.jpg";
import bagImg2 from "../assets/bagimage.jpg";
import perfume from "../assets/perfume.webp";
import backpack from "../assets/backpack.webp";
import childimage from "../assets/childimage.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "../components/icons/icons.jsx";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
    { name: "حقائب الظهر", image: bagImg, description: "this is the test description" },
    { name: "الاكسسوارات", image: accessory, description: "this is the test description" },
    { name: "حقائب يد", image: bagImg2, description: "this is the test description" },
    { name: "العطور", image: perfume, description: "this is the test description" },
    { name: "حقائب الظهر", image: backpack, description: "this is the test description" },
    { name: "أطفال", image: childimage, description: "this is the test description" },
    { name: "الاكسسوارات", image: accessory, description: "this is the test description" },
    { name: "أطفال", image: childimage, description: "this is the test description" },
    { name: "العطور", image: perfume, description: "this is the test description" },
    { name: "حقائب الظهر", image: backpack, description: "this is the test description" },
];

const ITEMS_PER_PAGE = 4;
const CARD_WIDTH = 220; // Adjust this value based on your card's width including margin

export function CategoryCards() {
    const [startIndex, setStartIndex] = useState(0);

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
