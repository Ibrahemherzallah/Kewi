import { Card, CardDescription, CardBody, CardImg, CardTitle, CardButton } from "../components/card/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import style from '../components/card/card.module.css';
import Typography from "../components/typography/typography";
import soldout from "../assets/soldout.png";
import sale from "../assets/sale1.png";
import {useContext, useEffect} from "react";
import {CartContext} from "../context/cartContext.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/userContext.jsx";





const CardItem = ({isSidebarOpen,setSidebarOpen,item}) => {

    const {products,setProducts} = useContext(CartContext);
    const {user,setUser} = useContext(UserContext);

    const navigate = useNavigate();

    function setLocalStorage(){
        let isExist = products.find(product => product._id === item._id);
        if(!isExist){
            const newItem = {
                ...item,
                numOfItems: 1,
            };
            setProducts([...products, newItem]);
        }
        if(!isSidebarOpen){
            setSidebarOpen(true);
        }
    }
    return(
        <Card>
            <div className="position-relative">
                { item.isSoldOut ? (
                    <img className={style.soldOutImg} src={soldout} alt="" />
                ) : null}
                { item.isOnSale ? (
                    <img className={style.saleImg} src={sale} alt="" />
                ) : null}
                <CardImg src={item.image.length > 1 ? item.image[0] : item.image} alt={item.name} onClick={()=>{
                    navigate(`/product/${item._id}`);
                }}/>
            </div>
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography component={'h6'} variant={'tertiary'}>{item.size}</Typography>
                  <CardTitle>{item.name}</CardTitle>
                </div>
                <Typography component={'h6'} variant={'tertiary'}  style={{minHeight:item?.color ? '0px' : '10px'}}>{item.color}</Typography>
                <CardDescription style={{minHeight:item?.description ? '0px' : '10px'}}>{item.description}</CardDescription>
                <div className="mt-1 mt-md-2 mt-lg-3 d-flex justify-content-between">
                  <CardButton isSoldOut={item.isSoldOut} size={'md'} job={'cart'} onClick={()=>{item.isSoldOut ? null : setLocalStorage()}}>
                      <FontAwesomeIcon className={`${style.addToCartIcon}`} icon={faCartPlus}  />
                  </CardButton>
                  <div className="d-flex gap-2 align-items-center">
                      { user?.isWholesaler ? <Typography component={'p'} variant={'tertiary'} line={'above'}>₪{item.customerPrice}</Typography> : item.isOnSale ? (
                          <Typography component={'p'} variant={'tertiary'} line={'above'}>₪{item.customerPrice}</Typography>
                      ) : null}
                      { user && user?.isWholesaler ? <Typography component={'h5'}>₪{item.wholesalerPrice}</Typography> : item.isOnSale ? (
                          <Typography component={'h5'}>₪{item.salePrice}</Typography>
                      ):
                          <Typography component={'h5'}>₪{item.customerPrice}</Typography>
                      }
                  </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardItem;

