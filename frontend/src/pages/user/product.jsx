import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import CardItem from "../../containers/card.jsx";
import Typography from "../../components/typography/typography.jsx";
import Layout from "./layout.jsx";
import {useParams} from "react-router";
import img from '../../assets/promotion.jpg'
import {useCallback, useContext, useEffect, useState} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {IconBtn} from "../../components/icons/icons.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CartContext} from "../../context/cartContext.jsx";
import Button from "../../components/button/button.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import {UserContext} from "../../context/userContext.jsx"; // import carousel

const Product = () => {

    const {id} = useParams();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [product,setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]); // initialize as []
    const [categoryId,setCategoryId] = useState(null);
    const [flag,setFlag] = useState(true);
    const { products, setProducts } = useContext(CartContext);
    const {user} = useContext(UserContext);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    })
    useEffect( () => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://kewi.ps/admin/products/${id}`);
                    const data = await response.json();
                    setProduct(data);
                    console.log('category',data);
                    setCategoryId(data?.categoryId?._id)
                    setFlag(!flag)
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }

            fetchData();
        },[id])



    useEffect(() => {
        const fetchRelatedProduct = async () => {
            try {
                const response = await fetch(`https://kewi.ps/admin/related-products/category/${categoryId}?excludeId=${id}`);
                const data = await response.json();
                setRelatedProduct(data);
                console.log("The related product is :", data);
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        if (categoryId) {
            fetchRelatedProduct();
        }
    }, [flag]);
    function setLocalStorage(){
        let isExist = products.find(item => item._id === product._id);
        console.log("isExist" ,isExist);
        if(!isExist){
            const newItem = {
                ...product,
                numOfItems: 1,
            };
            setProducts([...products, newItem]);
        }
        if(!isSidebarOpen){
            setSidebarOpen(true);
        }
        console.log("products products",products);

    }

    console.log("The related product is : " , product);
    return (
            <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}>
                <div className={`d-flex ${style.productDiv}`}>
                    <div className={`overflow-hidden ${style.imagesDiv}`}>
                        <Carousel>
                            {product?.image?.map((imgSrc, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className={`d-block w-100 ${style.productPageImages}`}
                                        src={imgSrc}
                                        alt={`Product image ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className={`d-flex flex-column ${style.productDetails}`}>
                        <h2 className={`fw-bold`}>{product?.name}</h2>
                        <Typography component={'h6'} variant={'tertiary'}>{product?.color}</Typography>
                        <div className={`mt-2 d-flex gap-3`}>
                            <Typography component={'h5'}>₪{user?.isWholesaler ? product.wholesalerPrice : product.isOnSale ? product.salePrice : product.customerPrice}.00</Typography>
                            {  product?.isOnSale &&
                                <div className={`mb-2`}>
                                    <Typography component={'p'} variant={'tertiary'} line={'above'}>₪{product.customerPrice}</Typography>
                                </div>
                            }
                        </div>
                        <br />
                        <p>{product.description}</p>

                        <Button variant={product.isSoldOut ? 'tertiary' : 'primary'} size={'xl'} style={{marginTop:'auto'}} onClick={()=>{product.isSoldOut ? null :setLocalStorage()}}>
                            أضف الى السلة <FontAwesomeIcon icon={faCartPlus} />
                        </Button>
                    </div>
                </div>


                <div className={`${style.relatedProductsDiv}`} data-aos="fade-up">
                    <Typography component="h1" style={{ whiteSpace: 'nowrap'}}>
                        منتجات <span className={`${style.relatedProductsText}`} style={{color: 'var(--secondary)'}}>مشابهة</span>
                    </Typography>
                    <div className={`${style.relatedProducts} my-5`}>
                        {
                            relatedProduct?.map((item, index) => (
                                <CardItem key={index} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} item={item}></CardItem>
                            ))
                        }
                    </div>
                </div>
            </Layout>
    )
}
export default Product;