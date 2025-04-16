import { Card, CardDescription, CardBody, CardImg, CardTitle, CardButton } from "../components/card/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import style from '../components/card/card.module.css';
import Typography from "../components/typography/typography";
import soldout from "../assets/soldout.png";
import sale from "../assets/sale1.png";
import {useContext, useEffect} from "react";
import {CartContext} from "../context/cartContext.jsx";





const CardItem = ({isSidebarOpen,setSidebarOpen,item}) => {

    const {products,setProducts} = useContext(CartContext);

    function setLocalStorage(){

        let isExist = products.find(product => product.id === item.id);
        if(!isExist){
            setProducts([...products,item])
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
                <CardImg src={item.image.length > 1 ? item.image[0] : item.image} alt={item.name}/>
            </div>
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <Typography component={'h6'} variant={'tertiary'}>{item.size}</Typography>
                  <CardTitle>{item.name}</CardTitle>
                </div>
                <Typography component={'h6'} variant={'tertiary'}>بنفسجي</Typography>
                <CardDescription>{item.description}</CardDescription>
                <div className="mt-3 d-flex justify-content-between">
                  <CardButton variant={item.isSoldOut? 'tertiary' :'secondary'} onClick={()=>{setLocalStorage()}}>
                      <FontAwesomeIcon icon={faCartPlus}  />
                  </CardButton>
                  <div className="d-flex gap-2 align-items-center">
                      { item.isOnSale ? (
                          <Typography component={'p'} variant={'tertiary'} line={'above'}>₪{item.customerPrice}</Typography>
                      ) : null}
                      { item.isOnSale ? (
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

