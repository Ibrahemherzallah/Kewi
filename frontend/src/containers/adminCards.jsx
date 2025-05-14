import Typography from "../components/typography/typography.jsx";
import style from "../components/card/card.module.css";
import {IconBtn} from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import {AddProductModal} from "../pages/admin/modals/addProducts.jsx";
import ConfirmationModal from "../pages/admin/modals/confirmationModal.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {useContext, useState} from "react";
import {ThemeContext} from "../context/themeContext.jsx";


export const ProductCard = ({product, setSelectedProduct,setOpenedBtn,setIsUpdated}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return(
        <div className={`mt-2 pe-2 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center ${style.ProductCardDiv}`}>
                <div className={style.productImageDiv}>
                    {!isImageLoaded && (
                        <Skeleton height="5rem" width="5rem" borderRadius={8} />
                    )}
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className={`${style.productImage} ${!isImageLoaded ? 'd-none' : ''}`}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
                <h6>{product.name}</h6>
                <h6>{product.id}</h6>
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
                <h6 className={`d-flex justify-content-center`}>{name}</h6>
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

export const BrandCard = ({src,name,numOfClicks,product,setIsUpdated,setSelectedProduct}) => {
    const modalId = `deleteModal-${product._id}`;
    const {isDark, setIsDark} = useContext(ThemeContext);

    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6 className={`d-flex justify-content-center`}>{name}</h6>
                <h6 className={`d-flex justify-content-center`}>{numOfClicks}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
            <ConfirmationModal id={modalId} itemId={product._id} deletedItem={'brand'}></ConfirmationModal>

        </div>
    )
}

export const OrderCard = ({res}) => {
    const {isDark, setIsDark} = useContext(ThemeContext);
    return(
        <div className={`mt-2 pe-1 ${isDark? style.AdminCardDivDark : style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.orderCardDiv}`}>
                <h6 className={`text-center`}>{res.fullName}</h6>
                <h6 className={`text-center`}>{res.phoneNumber}</h6>
                <h6 className={`text-center`}>{res.city} - {res.streetAddress}</h6>
                <h6 className={`text-center`}>{res.productId}</h6>
                <h6 className={`text-center`}>{res.price}</h6>
                <h6 className={`text-center`}>{res.numOfItems}</h6>
                <h6 className={`text-center`}>{res.deliveryType}</h6>
                <h6 className={`text-center`}>{res.createdAt.toString().split('T')[0]}</h6>
                <h6 className={`text-center`}>{res.notes}</h6>
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

