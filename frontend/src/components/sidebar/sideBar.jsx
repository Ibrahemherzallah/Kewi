import style from './Sidebar.module.css';
import SideBarCards from "../../containers/sideBarCard.jsx";
import SideBarCard from "../../containers/sideBarCard.jsx";
import {useContext} from "react";
import {CartContext} from "../../context/cartContext.jsx";
import product from "../../pages/user/product.jsx";

const Sidebar = ({ isOpen, onClose }) => {
    const {products,setProducts} = useContext(CartContext);
    return (
        <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
            <button className={style.closeBtn} onClick={onClose}>×</button>
            <div className={style.content}>
                <h3 className={`pt-3 ps-3 fw-semibold`}>سلة المشتريات</h3>
            </div>
            <div className={style.sideBarCardsContainer}>
                {
                    products?.map((product, index) => {
                    return <SideBarCard key={index} product={product} />;
                })}
            </div>
        </div>
    );
};

export default Sidebar;