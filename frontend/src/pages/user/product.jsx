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
import {UserContext} from "../../context/userContext.jsx";
import {CartReserve} from "../../context/cartReserve.jsx"; // import carousel

const Product = () => {

    const {id} = useParams();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [product,setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]); // initialize as []
    const [categoryId,setCategoryId] = useState(null);
    const [flag,setFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('cart');
    const { products, setProducts } = useContext(CartContext);
    const { reserved, setReserved } = useContext(CartReserve);
    const {user} = useContext(UserContext);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    })
    useEffect( () => {
        setLoading(true);
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://kewi.ps/admin/products/${id}`);
                    const data = await response.json();
                    setProduct(data);
                    setCategoryId(data?.categoryId?._id)
                    setFlag(!flag)
                } catch (error) {
                    console.error("Error fetching product:", error);
                    setError(error.message || 'حدث خطأ غير متوقع');
                } finally {
                    setLoading(false);
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
    }
    async function setLocalReserved() {
        let isExist = reserved.find(r => r._id === product._id);

        if (!isExist) {
            // Call API to increment clicks only if new
            try {
                await fetch(`https://kewi.ps/admin/products/${product._id}/click`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.error("Failed to update product clicks:", err);
            }

            // Add to reserved
            const newItem = {
                ...product,
                numOfItems: 1,
            };
            setReserved([...reserved, newItem]);
        }

        // Open sidebar on reserved tab
        if (!isSidebarOpen) {
            setActiveTab("reserved");
            setSidebarOpen(true);
        }
    }
    return (
        <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab}>
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "600", color: "#666",height: '40rem' }}>
                    جاري تحميل المنتج...
                </p>
            ) : error ? (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "600", color: "red" }}>
                    {error}
                </p>
            ) : (
                <>
                    {/* Product Details */}
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
                                <Typography component={'h5'}>
                                    ₪{user?.isWholesaler
                                    ? product.wholesalerPrice
                                    : product.isOnSale
                                        ? product.salePrice
                                        : product.customerPrice}.00
                                </Typography>
                                {product?.isOnSale && (
                                    <div className={`mb-2`}>
                                        <Typography component={'p'} variant={'tertiary'} line={'above'}>
                                            ₪{product.customerPrice}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                            <br />
                            <p>{product.description}</p>
                            {
                                product.isSoon
                                    ?
                                    <Button
                                        variant={product?.isSoldOut ? 'tertiary' : 'primary'}
                                        size={'xl'}
                                        style={{ marginTop: 'auto' }}
                                        onClick={() => {
                                            if (!product.isSoldOut) setLocalReserved();
                                        }}
                                    >
                                        إحجز الان
                                    </Button>
                                    :
                                    <Button
                                        variant={product?.isSoldOut ? 'tertiary' : 'primary'}
                                        size={'xl'}
                                        style={{ marginTop: 'auto' }}
                                        onClick={() => {
                                            if (!product.isSoldOut) setLocalStorage();
                                        }}
                                    >
                                        أضف الى السلة <FontAwesomeIcon icon={faCartPlus} />
                                    </Button>
                            }

                        </div>
                    </div>

                    {/* Related Products */}
                    <div className={`${style.relatedProductsDiv}`} data-aos="fade-up">
                        <Typography component="h1" style={{ whiteSpace: 'nowrap' }}>
                            منتجات <span className={`${style.relatedProductsText}`} style={{ color: 'var(--secondary)' }}>مشابهة</span>
                        </Typography>
                        <div className={`${style.relatedProducts} my-5`}>
                            {relatedProduct?.map((item, index) => (
                                <CardItem
                                    key={index}
                                    isSidebarOpen={isSidebarOpen}
                                    setSidebarOpen={setSidebarOpen}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Product;