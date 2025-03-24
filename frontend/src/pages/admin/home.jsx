import AdminNav from "../../containers/adminNavBar.jsx";
import style from "./style/adminDash.module.css";
const AdminDash = () => {
    return(
        <>
            <AdminNav></AdminNav>
            <div className={`${style.container}`}>
                <ul className={`nav nav-pills mb-3 ${style.tabs}`} id="pills-tab" role="tablist">
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Products
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Categories
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Brands
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Orders
                        </button>
                    </li>

                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Wholesaler
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className={`tab-pane fade show active  ${style.productsTab}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                            <h6>Image</h6><h6>Name</h6><h6>Brand</h6><h6>Category</h6><h6>Price</h6><h6>Status</h6><h6># of clicks</h6><h6>Actions</h6>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${style.productsTab}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                            <h6>Image</h6><h6>Name</h6><h6>Actions</h6>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${style.productsTab}`} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                            <h6>Image</h6><h6>Name</h6><h6><input className={`me-2`} type="checkbox" /> Fake</h6>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${style.productsTab}`} id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">
                        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                            <h6>Image</h6><h6>Name</h6><h6>Brand</h6><h6>Category</h6><h6>Price</h6><h6>Status</h6><h6># of clicks</h6><h6>Actions</h6>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${style.productsTab}`} id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">
                        <div className={`d-flex justify-content-between pb-2 ${style.contents}`}>
                            <h6>Image</h6><h6>Name</h6><h6>Brand</h6><h6>Category</h6><h6>Price</h6><h6>Status</h6><h6># of clicks</h6><h6>Actions</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>

)
}

export default AdminDash;