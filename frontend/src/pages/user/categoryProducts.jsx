import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import CardItem from "../../containers/card.jsx";
import Typography from "../../components/typography/typography.jsx";
import Layout from "./layout.jsx";
import {DropDown, UserDropDown} from "../../components/dropdown/dropDown.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import noProduct from '../../assets/nproduct.webp';

const CategoryProducts = () => {
    const sizes = ['كبير', 'صغير','وسط'];
    const [brands, setBrands] = useState([]);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const { catName } = location.state || {};
    const [selectedBrand , setSelectedBrand] = useState(undefined);
    const [selectedSize, setSelectedSize] = useState(undefined);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [allBrands, setAllBrands] = useState([]);
    const filteredProducts = products.filter(item =>
        (!selectedBrand || item?.brandId?.name === selectedBrand) &&
        (!selectedSize || item?.size === selectedSize)
    );


    async function fetchBrands() {
        if (brands.length === 0) {
            try {
                const response = await fetch("https://kewi.ps/admin/brands");
                const data = await response.json();
                setAllBrands(data);
                // Set the brands using setBrands instead of pushing directly into the array
                const brandNames = data.map(item => item.name);
                setBrands(brandNames); // This will trigger a re-render with the updated brands.
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
    }
    async function fetchProducts() {
        try {
            const res = await fetch(`https://kewi.ps/admin/products/category/${id}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products by category:", err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [id]);
    useEffect(()=>{
        fetchBrands();
    },[])
    return (
        <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}>
            <div className={`d-flex justify-content-between ${style.categoryProductsHeader}`}>
                {
                    <h2 className={`mt-3 mb-5 ${style.categoryHeader}`}>
                        {catName}
                        <Typography component={'p'} style={{marginTop:'0.5rem'}}>تسوقي ارقى {catName ===  'اخرى' || catName === 'قريبا' ? "المنتجات" : catName}   💎 </Typography>
                    </h2>
                }

                { catName === 'حقائب اليد' &&
                    <div className={`d-flex mt-3 justify-content-between ${style.dropdownsDiv}`}>
                        <UserDropDown options={brands} dropdownType={"النوع"} size={'medium'}
                            setSelected={(value) => {
                            const selected = allBrands.find(b =>  b.name === value);
                            if (selected?.isFake) {
                                // Send request to increment clicks
                                fetch(`https://kewi.ps/admin/brands/${selected._id}/click`, {
                                    method: 'PATCH',
                                }).catch(err => console.error("Error incrementing clicks:", err));
                                    }
                                    setSelectedBrand(value);
                                }}
                                    selected={selectedBrand}>

                        </UserDropDown>
                        <UserDropDown options={sizes} dropdownType={"الحجم"} size={'medium'} setSelected={setSelectedSize} selected={selectedSize}></UserDropDown>
                     </div>
                }
            </div>
            <div className={`mb-5 ${filteredProducts.length === 0 ? `d-flex justify-content-center` : ''} ${style.categoryProducts}`}>
                {
                    filteredProducts?.map((item, index) => (
                        <CardItem key={index} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} item={item}></CardItem>
                    ))
                }
                {
                    (filteredProducts.length === 0) &&
                    <div className={`w-100 d-flex justify-content-center`}>
                        <img src={noProduct} className={style.noProductImg}  alt={"noProduct"} />
                    </div>
                }
            </div>
        </Layout>
    );
}
export default CategoryProducts;