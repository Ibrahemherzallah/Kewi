import style from '../components/sidebar/sidebar.module.css';
import { IconBtn } from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { CartContext } from "../context/cartContext.jsx";
import {UserContext} from "../context/userContext.jsx";
import {CartReserve} from "../context/cartReserve.jsx";

const SideBarCard = ({ product }) => {
    const { products, setProducts } = useContext(CartContext);
    const { reserved, setReserved } = useContext(CartReserve);
    const { user } = useContext(UserContext);


    function handleDeleteCard() {
        const updatedProducts = products.filter(p => p._id !== product._id);
        setProducts(updatedProducts);
    }

    function handleDeleteReserved() {
        const updatedProducts = reserved.filter(p => p._id !== product._id);
        setReserved(updatedProducts);
    }

    function addOne() {
        const updatedProducts = products.map(p => {
            if (p._id === product._id) {
                return { ...p, numOfItems: (p.numOfItems || 1) + 1 };
            }
            return p;
        });
        setProducts(updatedProducts);
    }
    function removeOne() {
        const updatedProducts = products.map(p => {
            if (p._id === product._id && (p.numOfItems || 1) > 1) {
                return { ...p, numOfItems: p.numOfItems - 1 };
            }
            return p;
        });
        setProducts(updatedProducts);
    }



    function addOneReserved() {
        const updatedProducts = reserved.map(p => {
            if (p._id === product._id) {
                return { ...p, numOfItems: (p.numOfItems || 1) + 1 };
            }
            return p;
        });
        setReserved(updatedProducts);
    }
    function removeOneReserved() {
        const updatedProducts = reserved.map(p => {
            if (p._id === product._id && (p.numOfItems || 1) > 1) {
                return { ...p, numOfItems: p.numOfItems - 1 };
            }
            return p;
        });
        setReserved(updatedProducts);
    }

    return (
        <div className={`d-flex mb-2 w-100 justify-content-between ${style.sideBarCard}`}>
            <div className={`w-100 p-2 px-3 ${style.sideBarCardContent}`}>
                <h1 className={`m-0 fw-semibold ${style.sideBarCardHeader}`}>{product?.name}</h1>
                <p className={`m-0 ${style.sideBarCardPrice}`}>
                    ₪{user?.isWholesaler ? product?.wholesalerPrice : product?.isOnSale ? product?.salePrice : product?.customerPrice}
                </p>
                <div className={`d-flex justify-content-between w-100 ${style.sideBarCardButtons}`}>
                    <div className={`d-flex justify-content-between align-items-center w-50`}>
                        <IconBtn variant={'square'} job={'sideCard'} style={{ color: 'var(--text-color)' }} onClick={product.isSoon ? removeOneReserved :removeOne}>
                            <FontAwesomeIcon className={`${style.sideCardBtn}`} icon={faMinus} />
                        </IconBtn>
                        <p className={`m-0 px-3 ${style.cardNumber}`}>{product?.numOfItems || 1}</p>
                        <IconBtn variant={'square'} job={'sideCard'} style={{ color: 'var(--text-color)' }} onClick={product.isSoon ? addOneReserved : addOne}>
                            <FontAwesomeIcon className={`${style.sideCardBtn}`}  icon={faPlus} />
                        </IconBtn>
                    </div>
                    <IconBtn style={{ color: 'gray' }} onClick={product.isSoon ? handleDeleteReserved : handleDeleteCard}>
                        <FontAwesomeIcon className={`${style.sideCardBtnTrash}`} icon={faTrash} />
                    </IconBtn>
                </div>
            </div>
            <div>
                <img src={product?.image[0]} alt={product?.name} className={style.sideBarCardImg} />
            </div>
        </div>
    );
};

export default SideBarCard;
