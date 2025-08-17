import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from "../components/card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "../components/icons/icons.jsx";
import { motion } from "framer-motion";

function getCardWidth() {
    const width = window.innerWidth;
    if (width <= 550) return 90;      // mobile
    else if (width <= 770) return 130; // tablet
    else if (width <= 1000) return 170;
    else return 220;                   // desktop
}

export function CategoryCards() {
    const [startIndex, setStartIndex] = useState(0);
    const [categories, setCategory] = useState([]);
    const [cardWidth, setCardWidth] = useState(getCardWidth());
    const navigate = useNavigate();

    const mobileScrollRef = useRef(null); // ref for mobile category wrapper
    const [hasScrolled, setHasScrolled] = useState(false); // prevent multiple triggers

    useEffect(() => {
        fetch("https://kewi.ps/user/categories")
            .then(response => response.json())
            .then(data => setCategory(data));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setCardWidth(getCardWidth());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function smoothScroll(element, from, to, duration) {
        const start = performance.now();

        function step(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            element.scrollLeft = from + (to - from) * progress;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }


    useEffect(() => {
        if (window.innerWidth > 770) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasScrolled) {
                    setHasScrolled(true);
                    const container = mobileScrollRef.current;
                    if (container) {
                        smoothScroll(container, 0, 200, 1500);
                        setTimeout(() => {
                            smoothScroll(container, 200, 0, 1500);
                        }, 2000); // pause 2s before returning
                    }
                }
            },
            { threshold: 0.3 }
        );

        if (mobileScrollRef.current) {
            observer.observe(mobileScrollRef.current);
        }

        return () => observer.disconnect();
    }, [hasScrolled]);



    const handleNext = () => {
        setStartIndex((prevIndex) => prevIndex + 4);
    };
    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex - 4 >= -3 ? prevIndex - 4 : categories.length - 4
        );
    };

    return (
        <div className={`d-flex align-items-center position-relative ${style.categories}`}>
            {window.innerWidth > 770 ? (
                <>
                    <IconBtn
                        onClick={handlePrev}
                        style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                        variant="circle"
                        size="lg"
                    >
                        <FontAwesomeIcon className={style.arrowIcon} icon={faChevronLeft} />
                    </IconBtn>

                    <motion.div
                        className={style.cardWrapper}
                        initial={{ x: 0 }}
                        animate={{ x: -startIndex * cardWidth }}
                        transition={{ type: "spring", stiffness: 20 }}
                        style={{ display: "flex", gap: '0.4rem' }}
                    >
                        {categories?.map((category, index) => (
                            <button
                                key={index}
                                className={style.imageCardBtn}
                                onClick={() => {
                                    navigate(`/category/${category._id}`, {
                                        state: { catName: category.name }
                                    });
                                }}
                            >
                                <div className={`w-100 ${style.imageCardContainer}`}>
                                    <img className={style.imageCard} src={category.image} alt={category.name} />
                                    <div className={style.overlay}>
                                        <span className={style.overlayText}>{category.name}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </motion.div>

                    <IconBtn
                        onClick={handleNext}
                        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                        variant="circle"
                        size="lg"
                    >
                        <FontAwesomeIcon className={style.arrowIcon} icon={faChevronRight} />
                    </IconBtn>
                </>
            ) : (
                <div
                    ref={mobileScrollRef}
                    className={style.cardWrapper}
                    style={{
                        display: "flex",
                        gap: '0.4rem',
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        paddingBottom: "0.5rem"
                    }}
                >
                    {categories?.map((category, index) => (
                        <button
                            key={index}
                            className={style.imageCardBtn}
                            style={{
                                flexShrink: 0, // prevent shrinking
                                // width: "90px" // set card width for mobile
                            }}
                            onClick={() => {
                                navigate(`/category/${category._id}`, {
                                    state: { catName: category.name }
                                });
                            }}
                        >
                            <div className={`w-100 ${style.imageCardContainer}`}>
                                <img
                                    className={style.imageCard}
                                    src={category.image}
                                    alt={category.name}
                                    // style={{
                                    //     width: "100%",
                                    //     height: "100%",
                                    //     objectFit: "cover",
                                    //     borderRadius: "10px"
                                    // }}
                                />
                                <div className={style.overlay}>
                                    <span className={style.overlayText}>{category.name}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
