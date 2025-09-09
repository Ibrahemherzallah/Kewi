import AdminNav from "../../containers/adminNavBar.jsx";
import style from "./style/adminDash.module.css";
import {BrandCard, CategoryCard, OrderCard, ProductCard, WholesalerCard} from "../../containers/adminCards.jsx";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/button/button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Input, SearchInput} from "../../components/input/input.jsx";
import {AddProductModal} from "./modals/addProducts.jsx";
import {AddCategoryModal} from "./modals/addCategory.jsx";
import {AddBrandsModal} from "./modals/addBrands.jsx";
import {AddWholesalers} from "./modals/addWholesalers.jsx";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../../context/userContext.jsx";
import {ThemeContext} from "../../context/themeContext.jsx";
import {data} from "react-router";
import Skeleton from "react-loading-skeleton";

const AdminDash = () => {

    const [activeTab, setActiveTab] = useState('products');
    const [result,setResult] = useState([]);
    const [searchedValue, setSearchedValue] = useState('');
    const [searchedId,setSearchedId] = useState('');
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [openedBtn, setOpenedBtn] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand,setSelectedBrand] = useState(null);
    const [selectedWholesaler,setSelectedWholesaler] = useState(null);
    const {isDark,setIsDark} = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);


    const fetchData = async (tab) => {
        setLoading(true);
        try {
            let response;
            switch (tab) {
                case "products":
                    setResult([]);
                    response = await fetch("https://kewi.ps/admin/products").then( response => response.json())
                        .then(data => {
                            setResult(data)
                        })
                    break;
                case "categories":
                    setResult([]);
                    response = await fetch("https://kewi.ps/admin/categories").then( response => response.json())
                        .then(data => {
                            setResult(data);
                        })
                    break;
                case "brands":
                    setResult([]);
                    response = await fetch("https://kewi.ps/admin/brands").then( response => response.json())
                        .then(data => {
                            setResult(data);
                        })
                    break;
                case "orders":
                    setResult([]);
                    response = await fetch('https://kewi.ps/admin/purchase').then( response => response.json())
                            .then(data => {
                                setResult(data);
                            })
                        break;

                case "wholesalers":
                    setResult([]);
                    response = await fetch("https://kewi.ps/admin/wholesalers").then( response => response.json())
                        .then(data => {
                            setResult(data);
                        })
                        break;
                default:return;
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);
    const fetchCategories = async () => {
        try {
            const response = await fetch("https://kewi.ps/admin/categories"); // Replace with actual API
            const data = await response.json();
            data.map(item => category.push({ id: item._id, name: item.name }))
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        setOpenedBtn(false);
    };
    const fetchBrands = async () => {
        try {
            const response = await fetch("https://kewi.ps/admin/brands"); // Replace with actual API
            const data = await response.json();
            data.map( item => brand.push({ id: item._id, name :item.name ,image : item.image,isFake: item.isFake }))
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    useEffect(() => {
        if(openedBtn && !category.length){
            fetchBrands()
            fetchCategories()
        }
    }, [openedBtn]);

    const filteredProducts = result.filter(item =>
        (searchedValue === "" || item?.name?.toLowerCase().includes(searchedValue.toLowerCase())) &&
        (searchedId === "" || item?.id?.toString().toLowerCase().includes(searchedId.toLowerCase()))
    );


    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await fetch(`https://kewi.ps/admin/orders/${id}`, {
                method: "DELETE",
            });
            // Update state to remove order from UI
            setResult(prev => prev.filter(order => order._id !== id));
        } catch (err) {
            console.error("Error deleting order:", err);
        }
    };

    return(
        <>
            <AdminNav></AdminNav>
            <div className={`${style.container}`}>
                <div className={`d-flex justify-content-between flex-md-wrap  ${style.navItemsDiv}`}>
                    <ul className={`nav nav-pills ${style.navPills} ${style.tabs}`} id="pills-tab" role="tablist">
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className={`nav-link active ${isDark ? style.navLinkDark : style.navLink}`} id="pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true" onClick={() => {
                                setActiveTab('products')
                            }}>Products
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className={`nav-link ${isDark ? style.navLinkDark : style.navLink}`} id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile" type="button" role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('categories')
                            }}>Categories
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className={`nav-link ${isDark ? style.navLinkDark : style.navLink}`} id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('brands')
                            }}>Brands
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className={`nav-link ${isDark ? style.navLinkDark : style.navLink}`} id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('orders')
                            }}>Orders
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className={`nav-link ${isDark ? style.navLinkDark : style.navLink}`} id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                    aria-selected="false" onClick={ ()=>{setActiveTab('wholesalers')}}>Wholesaler
                            </button>
                        </li>
                    </ul>

                    {activeTab === 'products' ?
                        <div className={`d-flex gap-3 ${style.addDiv}`}>
                            <SearchInput placeholder={"Search by id"} onChange={(e) => {
                                setSearchedId(e.target.value);
                            }}
                            />
                            <SearchInput placeholder={"Search by name"} onChange={(e) => {
                                setSearchedValue(e.target.value);
                            }}
                            />
                            <Button variant={isDark ? 'secondary-outline' : 'secondary'} type="button" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1" onClick={()=>{setIsUpdated(false); setOpenedBtn(true); setSelectedProduct(null)}}>
                                <FontAwesomeIcon icon={faPlus} size="md"/>
                                Add Products
                            </Button>
                        </div>
                        : activeTab === 'categories' ?
                            <div className={`d-flex gap-3 ${style.addDiv}`}>
                                <Button variant={isDark ? 'secondary-outline' : 'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal3" onClick={()=>{setIsUpdated(false); setSelectedCategory(null)}}>
                                    <FontAwesomeIcon icon={faPlus} size="md"/>
                                    Add Category
                                </Button>
                            </div> : activeTab === 'brands' ?
                            <div className={`d-flex gap-3 ${style.addDiv}`}>
                                <Button variant={isDark ? 'secondary-outline' : 'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{setIsUpdated(false); setSelectedBrand(null)}}>
                                        <FontAwesomeIcon icon={faPlus} size="md"/>
                                        Add Brands
                                </Button>
                            </div>: activeTab === 'orders' ?
                            '' : activeTab === 'wholesalers'?
                                        <div className={`d-flex gap-3 ${style.addDiv}`}>
                                        <Button variant={isDark ? 'secondary-outline' : 'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal5" onClick={()=>{setIsUpdated(false); setSelectedWholesaler(null)}}>
                                            <FontAwesomeIcon icon={faPlus} size="md"/>Add Wholesalers</Button>
                                        </div>: 'null'}
                </div>
                {
                    loading ? (
                        <div>
                            <Skeleton height={100} count={5} />
                        </div>
                    ) : (
                        <div className={`${style.scrollWrapper}`}>
                            <div className={`tab-content ${style.mainContentDiv}`}>
                                {activeTab === "products" && (
                                    <div className={`tab-pane fade show active ${style.productsTab}`}>
                                        <div className={`d-flex justify-content-between pb-2 mb-4 ${style.contents}`}>
                                            <h6>Image</h6><h6>Name</h6><h6>id</h6><h6>Brand</h6><h6>Category</h6><h6>Price</h6><h6>Status</h6><h6>Reserved Num</h6><h6>Actions</h6>
                                        </div>
                                            {filteredProducts.map(res => (
                                                <ProductCard key={res._id} product={res} setSelectedProduct={setSelectedProduct} setOpenedBtn={setOpenedBtn} setIsUpdated={setIsUpdated}/>
                                            ))}
                                        <AddProductModal category={category} brand={brand} product={selectedProduct} isUpdated={isUpdated}/>
                                    </div>
                                )}

                                {activeTab === "categories" && (
                                    <div className={`tab-pane fade show active ${style.productsTab}`}>
                                        <div className={`d-flex justify-content-between pb-2 mb-4 ${style.contents}`}>
                                            <h6>Image</h6><h6>Name</h6><h6>Description</h6><h6>Actions</h6>
                                        </div>
                                        {Array.isArray(result) && result.map(res => (
                                            <CategoryCard key={res.id} product={res} setSelectedProduct={setSelectedCategory} setIsUpdated={setIsUpdated} src={res.image} alt={res.name} name={res.name} description={res.description}/>
                                        ))}
                                        <AddCategoryModal product={selectedCategory} isUpdated={isUpdated}/>

                                    </div>
                                )}

                                {activeTab === "brands" && (
                                    <div className={`tab-pane fade show active ${style.productsTab}`}>
                                        <div className={`d-flex justify-content-between pb-2 mb-4 ${style.contents}`}>
                                            <h6>Image</h6><h6>Name</h6><h6>#of Clicks</h6><h6>Actions</h6>
                                        </div>
                                        {Array.isArray(result) && result.map(res => (
                                            <BrandCard key={res.id} product={res} setSelectedProduct={setSelectedBrand} setIsUpdated={setIsUpdated} numOfClicks={res.isFake ? res.numOfClicks : '#'} src={res.image} alt={res.name} name={res.name}/>
                                        ))}
                                        <AddBrandsModal product={selectedBrand} isUpdated={isUpdated}></AddBrandsModal>

                                    </div>
                                )}

                                {activeTab === "orders" && (
                                    <div className={`tab-pane fade show active ${style.productsTab}`}>
                                        <div className={`d-flex justify-content-between pb-2 mb-4 ${style.contents}`}>
                                            <h6>CName</h6><h6>C Phone</h6><h6>C Address</h6><h6>productId</h6><h6>colors</h6><h6>Price</h6><h6>DeliveryType</h6><h6>Order Date</h6><h6>Notes</h6>
                                        </div>
                                        {Array.isArray(result) && result.map(res => (
                                            <OrderCard key={res._id} res={res} deleteOrder={handleDeleteOrder}/>
                                        ))}
                                    </div>
                                )}
                                {activeTab === "wholesalers" && (
                                    <div className={`tab-pane fade show active ${style.productsTab}`}>
                                        <div className={`d-flex justify-content-between pb-2 mb-4 ${style.contents}`}>
                                            <h6>Full Name</h6><h6>Phone Number</h6><h6>Address</h6><h6>Actions</h6>
                                        </div>
                                        {Array.isArray(result) && result.map(res => ( res.isWholesaler &&
                                            <WholesalerCard key={res.id} product={res} setSelectedProduct={setSelectedWholesaler} setIsUpdated={setIsUpdated} name={res.userName} number={res.phone} address={res.address}/>
                                        ))}
                                        <AddWholesalers product={selectedWholesaler} isUpdated={isUpdated} ></AddWholesalers>
                                    </div>
                                )}
                            </div>
                        </div>
                    )

                }
            </div>
        </>

    )
}

export default AdminDash;