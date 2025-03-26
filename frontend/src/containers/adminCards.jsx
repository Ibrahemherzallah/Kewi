import Typography from "../components/typography/typography.jsx";
import style from "../components/card/card.module.css";
import {IconBtn} from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

export const ProductCard = ({src,alt,name,brand,category,price,status,numOfClicks}) => {
    return(
        <div className={`mt-2 pe-1 ${style.productCard}`}>
            <div className={`d-flex align-items-center`}>
                <img className={style.productImage} src={src} alt={alt} />
                <h6>{name}</h6>
                <h6>{brand?.name}</h6>
                <h6>{category}</h6>
                <h6>₪ {price}</h6>
                <h6>{status}</h6>
                <h6>{brand?.isFake ? numOfClicks : '#'}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}


export const CategoryCard = ({src,alt,name}) => {
    return(
        <div className={`mt-2 pe-1 ${style.productCard}`}>
            <div className={`d-flex align-items-center justify-content-between`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}

export const BrandCard = ({src,alt,name}) => {
    return(
        <div className={`mt-2 pe-1 ${style.productCard}`}>
            <div className={`d-flex align-items-center justify-content-between`}>
                <img className={style.productImage} src={src} alt={`${name} image`} />
                <h6>{name}</h6>
                <div className={'gap-2 d-flex align-items-center'}>
                    <button><FontAwesomeIcon className={`text-danger`} style={{fontSize:'0.8rem'}} icon={faTrash} /></button>
                    <button><FontAwesomeIcon style={{color:'var(--primary)',fontSize:'0.8rem'}} icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}

