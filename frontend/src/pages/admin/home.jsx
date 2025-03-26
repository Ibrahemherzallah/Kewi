import AdminNav from "../../containers/adminNavBar.jsx";
import style from "./style/adminDash.module.css";
import {BrandCard, CategoryCard, ProductCard} from "../../containers/adminCards.jsx";
import {useEffect, useState} from "react";
import Button from "../../components/button/button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {Input, SearchInput} from "../../components/input/input.jsx";
import {AddProductModal} from "./modals/addProducts.jsx";
import {AddCategoryModal} from "./modals/addCategory.jsx";
import {AddBrandsModal} from "./modals/addBrands.jsx";
import {AddOrderModal} from "./modals/addOrders.jsx";
import {AddWholesalers} from "./modals/addWholesalers.jsx";
// import {response} from "express";

const AdminDash = () => {

    const [activeTab, setActiveTab] = useState('products');
    const [result,setResult] = useState();
    const [searchedValue, setSearchedValue] = useState('');
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [openedBtn, setOpenedBtn] = useState(false);

    const fetchData = async (tab) => {
        try {
            let response;
            switch (tab) {
                case "products":
                    response = await fetch("http://localhost:5001/admin/products").then( response => response.json())
                        .then(data => {
                            setResult(data)
                            // searchedValue === '' ?  : setResult(data.filter(item => item.includes(searchedValue)))
                            console.log(data);
                        })
                    break;
                case "categories":
                    response = await fetch("http://localhost:5001/admin/categories").then( response => response.json())
                        .then(data => {
                            setResult(data);
                            console.log(data);
                        })
                    break;
                case "brands":
                    response = await fetch("http://localhost:5001/admin/brands").then( response => response.json())
                        .then(data => {
                            setResult(data);
                            console.log(data);
                        })
                    break;
                case "orders":
                        response = await fetch("http://localhost:5001/admin/orders").then( response => response.json())
                            .then(data => {
                                setResult(data);
                                console.log(data);
                            })
                        break;

                case "wholesalers":
                    response = await fetch("http://localhost:5001/admin/wholesalers").then( response => response.json())
                        .then(data => {
                            setResult(data);
                            console.log(data);
                        })
                        break;
                default:
                    return;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);



    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:5001/admin/categories"); // Replace with actual API
            const data = await response.json();
            data.map(item => category.push({name:item.name}))
            console.log("The category is : " , category);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        setOpenedBtn(false);
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:5001/admin/brands"); // Replace with actual API
            const data = await response.json();
            data.map( item => brand.push({name :item.name ,image : item.image }))
            console.log("The setBrand is : " , brand);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        console.log("the openedBtn in effect is : " , openedBtn);
        if(openedBtn){
            fetchBrands()
            fetchCategories()
        }
    }, [openedBtn]);





    return(
        <>
            <AdminNav></AdminNav>
            <div className={`${style.container}`}>
                <div className={`d-flex justify-content-between align-items-center ${style.tabsDiv}`}>
                    <ul className={`nav nav-pills ${style.tabs}`} id="pills-tab" role="tablist">
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                    aria-selected="true" onClick={() => {
                                setActiveTab('products')
                            }}>Products
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile" type="button" role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('categories')
                            }}>Categories
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('brands')
                            }}>Brands
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false" onClick={() => {
                                setActiveTab('orders')
                            }}>Orders
                            </button>
                        </li>
                        <li className={`nav-item ${style.navItem}`} role="presentation">
                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                    aria-selected="false" onClick={ ()=>{setActiveTab('wholesalers')}}>Wholesaler
                            </button>
                        </li>
                    </ul>

                    {activeTab === 'products' ?
                        <div className={`d-flex justify-content-between ${style.addDiv}`}>
                            <SearchInput placeholder={"Search by name"} onChange={(e) => {
                                setSearchedValue(e.target.value);
                            }}
                            />
                            <Button variant={'secondary'} type="button" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1" onClick={()=> setOpenedBtn(true)}>
                                <FontAwesomeIcon icon={faPlus} size="md"/>
                                Add Products</Button>
                        </div>
                        : activeTab === 'categories' ?
                            <Button variant={'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                <FontAwesomeIcon icon={faPlus} size="md"/>
                                Add Category
                            </Button> : activeTab === 'brands' ?
                            <Button variant={'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    <FontAwesomeIcon icon={faPlus} size="md"/>
                                    Add Brands
                            </Button> : activeTab === 'orders' ?
                            <Button variant={'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal4">
                                        <FontAwesomeIcon icon={faPlus} size="md"/>Add Orders</Button> : activeTab === 'wholesalers'?
                                        <Button variant={'secondary'} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal5">
                                            <FontAwesomeIcon icon={faPlus} size="md"/>Add Wholesalers</Button>: 'null'}
                </div>
                {/*Product Modal*/}
                <AddProductModal category={category} brand={brand}></AddProductModal>

                {/*Brands Modal*/}


                <AddBrandsModal></AddBrandsModal>

                {/*Category Modal*/}

                <AddCategoryModal></AddCategoryModal>

                {/*Order Modal*/}

                <AddOrderModal></AddOrderModal>

                {/*Wholesaler Modal*/}

                <AddWholesalers></AddWholesalers>

                <div className="tab-content">
                    {activeTab === "products" && (
                        <div className={`tab-pane fade show active ${style.productsTab}`}>
                            <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                                <h6>Image</h6><h6>Name</h6><h6>Brand</h6><h6>Category</h6><h6>Price</h6><h6>Status</h6>
                                <h6># of clicks</h6><h6>Actions</h6>
                            </div>
                            {Array.isArray(result) && result
                                .filter(item => item?.name?.includes(searchedValue))
                                .map(res => (
                                    <ProductCard key={res.id} src={res.image[0]} alt={res.name} name={res.name}
                                                 brand={res?.brandId} category={res?.categoryId?.name}
                                                 price={res.customerPrice}
                                                 status={res.isSoldOut ? 'Sold out' : 'In Stock'}
                                                 numOfClicks={res.numOfClicks}/>
                                ))}
                        </div>
                    )}

                    {activeTab === "categories" && (
                        <div className={`tab-pane fade show active ${style.productsTab}`}>
                            <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                                <h6>Image</h6><h6>Name</h6><h6>Actions</h6>
                            </div>
                            {Array.isArray(result) && result.map(res => (
                                <CategoryCard key={res.id} src={res.image} alt={res.name} name={res.name}/>
                            ))}
                        </div>
                    )}

                    {activeTab === "brands" && (
                        <div className={`tab-pane fade show active ${style.productsTab}`}>
                            <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                                <h6>Image</h6><h6>Name</h6><h6>Actions</h6>
                            </div>
                            {Array.isArray(result) && result.map(res => (
                                <BrandCard key={res.id} src={res.image} alt={res.name} name={res.name}/>
                            ))}
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className={`tab-pane fade show active ${style.productsTab}`}>
                            <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                                <h6>Image</h6><h6>Name</h6><h6>Actions</h6>
                            </div>
                            {Array.isArray(result) && result.map(res => (
                                <BrandCard key={res.id} src={res.image} alt={res.name} name={res.name}/>
                            ))}
                        </div>
                    )}
                    {activeTab === "wholesalers" && (
                        <div className={`tab-pane fade show active ${style.productsTab}`}>
                            <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                                <h6>Image</h6><h6>Name</h6><h6>Actions</h6>
                            </div>
                            {Array.isArray(result) && result.map(res => (
                                <BrandCard key={res.id} src={res.image} alt={res.name} name={res.name}/>
                            ))}
                        </div>
                    )}
                    {/*{activeTab === "orders" && (*/}
                    {/*    <div className={`tab-pane fade show active ${style.productsTab}`}>*/}
                    {/*        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>*/}
                    {/*            <h6>Order ID</h6><h6>Customer</h6><h6>Status</h6><h6>Total Price</h6><h6>Actions</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {/*{activeTab === "wholesalers" && (*/}
                    {/*    <div className={`tab-pane fade show active ${style.productsTab}`}>*/}
                    {/*        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>*/}
                    {/*            <h6>Wholesaler Name</h6><h6>Contact</h6><h6>Location</h6><h6>Actions</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                </div>
            </div>
        </>

    )
}

export default AdminDash;