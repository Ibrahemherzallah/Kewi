import Typography from "../components/typography/typography.jsx";
import style from "../components/card/card.module.css";
import {IconBtn} from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import {AddProductModal} from "../pages/admin/modals/addProducts.jsx";
import ConfirmationModal from "../pages/admin/modals/confirmationModal.jsx";
import {useContext} from "react";
import {ThemeContext} from "../context/themeContext.jsx";


export const ProductCard = ({product, setSelectedProduct,setOpenedBtn,setIsUpdated}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);
    return(
        <div className={`mt-2 pe-2 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center ${style.ProductCardDiv}`}>
                <div className={style.productImageDiv}>
                    <img className={style.productImage} src={product.image[0]} alt={product.name} />
                </div>
                <h6>{product.name}</h6>
                <h6>{product?.brandId?.name}</h6>
                <h6>{product?.categoryId?.name}</h6>
                <h6>₪ {product.customerPrice}</h6>
                <h6>{product.isSoldOut ? 'Sold out' : 'In Stock'}</h6>
                <h6>{product?.brandId?.isFake ? product.numOfClicks : '#'}</h6>
                <div className={`gap-2 d-flex align-items-center ${style.actionsDiv}`}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{fontSize:'0.8rem'}} onClick={() =>{setIsUpdated(true);setOpenedBtn(true);setSelectedProduct(product)} }>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>
            </div>
            <ConfirmationModal id={modalId} itemId={product._id} deletedItem={'product'}></ConfirmationModal>
        </div>
    )
}

export const CategoryCard = ({src,name,description,product,setSelectedProduct,setIsUpdated}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);

    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <h6>{description}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen}/></button>
                </div>
            </div>
            <ConfirmationModal id={modalId} itemId={product._id} deletedItem={'categories'}></ConfirmationModal>
        </div>
    )
}

export const BrandCard = ({src,name,product,setIsUpdated,setSelectedProduct}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);

    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
            <ConfirmationModal id={modalId} itemId={product._id} deletedItem={'brand'}></ConfirmationModal>

        </div>
    )
}

export const OrderCard = ({productName,productSize,productBrand,productCategory,date,price,customerPhone,customerName,address}) => {
    const {isDark, setIsDark} = useContext(ThemeContext);
    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.orderCardDiv}`}>
                <h6>{productName}</h6>
                <h6>{productSize}</h6>
                <h6>{productBrand}</h6>
                <h6>{productCategory}</h6>
                <h6 className={`ps-3`}>{date.toString().split('T')[0]}</h6>
                <h6>{price}</h6>
                <h6>{customerName}</h6>
                <h6>{customerPhone}</h6>
                <h6>{address}</h6>
            </div>
        </div>
    )
}

export const WholesalerCard = ({name, number,address,product,setIsUpdated,setSelectedProduct}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);

    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.WholCardDiv}`}>
                <h6>{name}</h6>
                <h6>{number}</h6>
                <h6 className={`ps-5`}>{address}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                        <FontAwesomeIcon className="text-danger" style={{ fontSize: "0.8rem" }} icon={faTrash} />
                    </button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal5" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
            <ConfirmationModal id={modalId} itemId={product._id} deletedItem={'wholesaler'}></ConfirmationModal>
        </div>
    )
}

