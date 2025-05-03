import style from "../components/card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "../components/icons/icons.jsx";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const ITEMS_PER_PAGE = 1;
const CARD_WIDTH = 220;
function getCardWidth() {
    const width = window.innerWidth;
    console.log("The width of screen is : " , width)
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
    useEffect(() => {
        fetch("https://kewi.ps/user/categories")
            .then(response => response.json())
            .then(data =>
            {
                setCategory(data);
            })
    },[])
    useEffect(() => {
        const handleResize = () => {
            setCardWidth(getCardWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleNext = () => {
        setStartIndex((prevIndex) =>{
            console.log("prevIndexxxxxx after" , prevIndex);
            return prevIndex + 4 ;
            }
        );
    };
    const handlePrev = () => {
        setStartIndex((prevIndex) => {
            console.log("prevIndexxxxxx before" , prevIndex);
            return prevIndex - 4 >= -3 ? prevIndex - 4 : categories.length - 4
            }
        );
    };
    return (
        <div className={`d-flex align-items-center position-relative ${style.categories}`}>
            {/* Left Arrow */}
            {
                window.innerWidth > 770 ?   <>
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
                        style={{ display: "flex" , gap:'0.4rem'}}
                    >
                        {categories?.map((category, index) => (
                            <button key={index} className={style.imageCardBtn}
                                    onClick={()=> {
                                        navigate(`/category/${category._id}`,{
                                            state: { catName: category.name}
                                        })
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


                    {/* Right Arrow */}
                    <IconBtn
                        onClick={handleNext}
                        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                        variant="circle"
                        size="lg"
                    >
                        <FontAwesomeIcon className={style.arrowIcon} icon={faChevronRight} />
                    </IconBtn>
                </> :
                    <div className={style.cardWrapper} style={{ display: "flex" , gap:'0.4rem'}}>
                        {categories?.map((category, index) => (
                            <button key={index} className={style.imageCardBtn}
                                    onClick={()=> {
                                        navigate(`/category/${category._id}`,{
                                            state: { catName: category.name}
                                        })
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
                    </div>
            }



        </div>
    );
}
