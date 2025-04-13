import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import bag1 from "../../assets/bag1.jpg";
import bag2 from "../../assets/bag2.jpg";
import CardItem from "../../containers/card.jsx";
import Typography from "../../components/typography/typography.jsx";
import Layout from "./layout.jsx";
import {DropDown, UserDropDown} from "../../components/dropdown/dropDown.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

const CategoryProducts = () => {
    const sizes = ['كبير', 'صغير','وسط'];
    const [brands, setBrands] = useState([]);
    const { id } = useParams();
    const [products, setProducts] = useState([]);


    async function fetchBrands() {
        if (brands.length === 0) { // This is a safeguard, but we will rely on state instead.
            try {
                const response = await fetch("http://localhost:5001/admin/brands");
                const data = await response.json();

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
            const res = await fetch(`http://localhost:5001/admin/products/category/${id}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products by category:", err);
        }
    }

    useEffect(() => {
        fetchBrands();
        fetchProducts();
    }, []); // Empty dependency array ensures this effect runs only once on mount


    return (
        <Layout>
            <div className={`d-flex justify-content-between`}>
                <div className={`d-flex mt-3 justify-content-between ${style.dropdownsDiv}`}>
                    <UserDropDown options={brands} dropdownType={"النوع"} size={'medium'} ></UserDropDown>
                    <UserDropDown options={sizes} dropdownType={"الحجم"} size={'medium'} ></UserDropDown>
                </div>
                    <h2 className={`mt-3 mb-5 ${style.categoryHeader}`}>
                        حقائب
                        <Typography component={'p'} style={{marginTop:'0.5rem'}}>تسوقي ارقى الحقائب   💎 </Typography>
                    </h2>

            </div>
            <div className={` ${style.categoryProducts}`}>
                {
                    products.map((item, index) => (
                        <CardItem item={item}></CardItem>
                    ))
                }
            </div>
        </Layout>
    );
}
export default CategoryProducts;