import style from '../components/sidebar/sidebar.module.css';
import {IconBtn} from "../components/icons/icons.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {CartContext} from "../context/cartContext.jsx";

const SideBarCard = ({product}) => {

    const {products,setProducts} = useContext(CartContext);
    function handleDeleteCard(){
        const updatedProducts = products.filter(p => p.id !== product.id);
        setProducts(updatedProducts);
    }

    return (
        <div className={` d-flex mb-2 w-100 justify-content-between  ${style.sideBarCard}`}>
            <div className={`w-100 p-2 px-3 ${style.sideBarCardContent}`}>
                <h1 className={`m-0 ${style.sideBarCardHeader}`}>{product?.name}</h1>
                <p className={`m-0`}>₪{product?.customerPrice}</p>
                    <div className={`mt-3 d-flex justify-content-between w-100 ${style.sideBarCardButtons}`}>
                        <div className={`d-flex justify-content-between align-items-center w-50`}>
                            <IconBtn variant={'square'}><FontAwesomeIcon icon={faMinus} /></IconBtn>
                            <p className={`m-0 px-3 ${style.cardNumber}`}>1</p>
                            <IconBtn variant={'square'}><FontAwesomeIcon icon={faPlus} /></IconBtn>
                        </div>
                        <IconBtn onClick={() => {handleDeleteCard()}}><FontAwesomeIcon icon={faTrash} /></IconBtn>
                    </div>
            </div>
            <div>
                <img src={product?.image[0]} alt={product?.name} className={style.sideBarCardImg} />
            </div>

        </div>
    )
}

export default SideBarCard;