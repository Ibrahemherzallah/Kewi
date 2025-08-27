import style from './sidebar.module.css';
import SideBarCard from "../../containers/sideBarCard.jsx";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext.jsx";
import product from "../../pages/user/product.jsx";
import Button from "../../components/button/button.jsx";
import emptyCart from "../../assets/empty-cart.png";
import { UserContext } from "../../context/userContext.jsx";
import { CartReserve } from "../../context/cartReserve.jsx";

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab}) => {
    const { products } = useContext(CartContext);
    const { reserved } = useContext(CartReserve);
    const { user } = useContext(UserContext);
    const [numOfItems, setNumOfItems] = useState(1);

    // Calculate total for cart
    const totalPrice = products.reduce((total, product) => {
        const quantity = product?.numOfItems || 1;
        const price = user?.isWholesaler
            ? product?.wholesalerPrice
            : product?.isOnSale
                ? product?.salePrice
                : product?.customerPrice;
        return total + price * quantity;
    }, 0);

    // Calculate total for reserved
    const reservedTotal = reserved.reduce((total, product) => {
        const quantity = product?.numOfItems || 1;
        const price = user?.isWholesaler
            ? product?.wholesalerPrice
            : product?.isOnSale
                ? product?.salePrice
                : product?.customerPrice;
        return total + price * quantity;
    }, 0);

    return (
        <>
            {isOpen && <div className={style.overlay} onClick={onClose}></div>}
            <div className={`${style.sidebar} ${isOpen ? style.open : ""}`}>
                <button className={style.closeBtn} onClick={onClose}>
                    ×
                </button>
                <div className={style.content}>
                    <h3 className="pt-3 ps-3 fw-semibold">سلة المشتريات</h3>

                    {/* Tabs */}
                    <div className={`${style.tabs} d-flex justify-content-center my-3`}>
                        <button
                            className={`${style.tabButton} ${activeTab === "cart" ? style.activeTab : ""}`}
                            onClick={() => setActiveTab("cart")}
                        >
                            🛒 المنتجات
                        </button>
                        <button
                            className={`${style.tabButton} ${activeTab === "reserved" ? style.activeTab : ""}`}
                            onClick={() => setActiveTab("reserved")}
                        >
                            📦 المحجوز
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className={style.sideBarCardsContainer}>
                    {activeTab === "cart" &&
                        (products.length ? (
                            products.map((product, index) => (
                                <SideBarCard
                                    key={index}
                                    product={product}
                                    numOfItems={numOfItems}
                                    setNumOfItems={setNumOfItems}
                                />
                            ))
                        ) : (
                            <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                                <img
                                    src={emptyCart}
                                    style={{ width: "10rem", height: "10rem" }}
                                    alt="empty-cart"
                                />
                                <p className="mt-4 fw-semibold fs-5">السلة فارغة</p>
                            </div>
                        ))}

                    {activeTab === "reserved" &&
                        (reserved.length ? (
                            reserved.map((product, index) => (
                                <SideBarCard
                                    key={index}
                                    product={product}
                                    numOfItems={numOfItems}
                                    setNumOfItems={setNumOfItems}
                                />
                            ))
                        ) : (
                            <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
                                <img
                                    src={emptyCart}
                                    style={{ width: "10rem", height: "10rem" }}
                                    alt="empty-cart"
                                />
                                <p className="mt-4 fw-semibold fs-5">لا يوجد منتجات محجوزة</p>
                            </div>
                        ))}
                </div>

                {/* Footer total & button */}
                {(activeTab === "cart" && products.length > 0) && (
                    <div>
                        <hr className={style.sideBarHr} />
                        <div className={`d-flex justify-content-between px-4 ${style.sidebarTotalPrice}`}>
                            <p>₪{totalPrice.toFixed(2)}</p>
                            <p>الاجمالي</p>
                        </div>
                        <div className="mx-4 mt-3">
                            <Button
                                variant="primary"
                                size="xl"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal9"
                            >
                                اتمام الشراء
                            </Button>
                        </div>
                    </div>
                )}

                {(activeTab === "reserved" && reserved.length > 0) && (
                    <div>
                        <hr className={style.sideBarHr} />
                        <div className={`d-flex justify-content-between px-4 ${style.sidebarTotalPrice}`}>
                            <p>₪{reservedTotal}</p>
                            <p>الاجمالي</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
