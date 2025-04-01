import Typography from "../components/typography/typography.jsx";
import style from "../components/card/card.module.css";
import {IconBtn} from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import {AddProductModal} from "../pages/admin/modals/addProducts.jsx";

const handleDelete = async (deletedItem, id) => {
    try {
        const response = await fetch(`http://localhost:5001/admin/${deletedItem}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to delete ${deletedItem}`);
        }

        alert(`${deletedItem} deleted successfully!`);
    } catch (error) {
        console.error(`Error deleting ${deletedItem}:`, error.message);
        alert(error.message);
    }
};

export const ProductCard = ({product, setSelectedProduct,setOpenedBtn,setIsUpdated}) => {
    return(
        <div className={`mt-2 pe-1 ${style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={product.image[0]} alt={product.name} />
                <h6>{product.name}</h6>
                <h6>{product?.brandId?.name}</h6>
                <h6>{product?.categoryId?.name}</h6>
                <h6>₪ {product.customerPrice}</h6>
                <h6>{product.isSoldOut ? 'Sold out' : 'In Stock'}</h6>
                <h6>{product?.brandId?.isFake ? product.numOfClicks : '#'}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button onClick={() => handleDelete("products", product._id)}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{fontSize:'0.8rem'}} onClick={() =>{setIsUpdated(true);setOpenedBtn(true);setSelectedProduct(product)} }>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export const CategoryCard = ({src,name,description,product,setSelectedProduct,setIsUpdated}) => {
    return(
        <div className={`mt-2 pe-1 ${style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <h6>{description}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button onClick={() => handleDelete("categories", product._id)}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen}/></button>
                </div>
            </div>
        </div>
    )
}

export const BrandCard = ({src,name,product,setIsUpdated,setSelectedProduct}) => {
    return(
        <div className={`mt-2 pe-1 ${style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.ProductCardDiv}`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button onClick={() => handleDelete("brands", product._id)}><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}

export const OrderCard = ({productName,productSize,productBrand,productCategory,date,price,customerPhone,customerName,address}) => {
    return(
        <div className={`mt-2 pe-1 ${style.AdminCardDiv}`}>
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
    return(
        <div className={`mt-2 pe-1 ${style.AdminCardDiv}`}>
            <div className={`d-flex align-items-center justify-content-between ${style.WholCardDiv}`}>
                <h6>{name}</h6>
                <h6>{number}</h6>
                <h6 className={`ps-5`}>{address}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button onClick={() => handleDelete("wholesalers", product._id)}>
                        <FontAwesomeIcon className="text-danger" style={{ fontSize: "0.8rem" }} icon={faTrash} />
                    </button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal5" onClick={() =>{setIsUpdated(true);setSelectedProduct(product)}}><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}