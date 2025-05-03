import style from './Sidebar.module.css';
import SideBarCards from "../../containers/sideBarCard.jsx";
import SideBarCard from "../../containers/sideBarCard.jsx";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/cartContext.jsx";
import product from "../../pages/user/product.jsx";
import Button from "../../components/button/Button.jsx";
import emptyCart from "../../assets/empty-cart.png";
import {UserContext} from "../../context/userContext.jsx";


const Sidebar = ({ isOpen, onClose }) => {
    const {products,setProducts} = useContext(CartContext);
    const [numOfItems, setNumOfItems] = useState(1);
    const {user,setUser} = useContext(UserContext);

    const totalPrice = products.reduce((total, product) => {
        const quantity = product?.numOfItems || 1;
        const price = user?.isWholesaler ?  product?.wholesalerPrice  : product?.isOnSale ? product?.salePrice : product?.customerPrice;
        return total + price * quantity;
    }, 0);

    console.log("totalPrice is : "  , totalPrice)

    return (
        <>
            {isOpen && <div className={style.overlay} onClick={onClose}></div>}
            <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
                <button className={style.closeBtn} onClick={onClose}>×</button>
                <div className={style.content}>
                    <h3 className={`pt-3 ps-3 fw-semibold`}>سلة المشتريات</h3>
                </div>
                <div className={style.sideBarCardsContainer}>
                    {
                        products?.map((product, index) => {
                            return <SideBarCard key={index} product={product} numOfItems={numOfItems} setNumOfItems={setNumOfItems} />;
                        })}
                    {
                        (!products || products.length === 0) &&
                        <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                            <img src={emptyCart} style={{width:'10rem',height:'10rem'}} alt="empty-cart" />
                            <p className={`mt-4 fw-semibold fs-5`}>Your cart is empty</p>
                        </div>
                    }
                </div>
                {
                    products.length ?
                        <div>
                            <hr className={style.sideBarHr} />
                            <div className={`d-flex justify-content-between px-4 ${style.sidebarTotalPrice}`}>
                                <p>₪{totalPrice}.00</p>
                                <p>الاجمالي</p>
                            </div>
                            <div className={`mx-4 mt-3`}>
                                <Button variant={'primary'} size={'xl'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal9">اتمام الشراء</Button>
                            </div>
                        </div>
                        : null
                }
            </div>

        </>
    );
};

export default Sidebar;