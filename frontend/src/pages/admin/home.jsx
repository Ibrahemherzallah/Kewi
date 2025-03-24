import AdminNav from "../../containers/adminNavBar.jsx";
import style from "./adminDash.module.css";
const AdminDash = () => {
    return(
        <>
            <AdminNav></AdminNav>
            <div className={`${style.container}`}>
                <ul className={`nav nav-pills mb-3 ${style.tabs}`} id="pills-tab" role="tablist">
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Home
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Profile
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Contact
                        </button>
                    </li>
                    <li className={`nav-item ${style.navItem}`} role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Contact
                        </button>
                    </li>

                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                         aria-labelledby="pills-home-tab" tabIndex="0">...
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                         tabIndex="0">...
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                         tabIndex="0">...
                    </div>
                    <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab"
                         tabIndex="0">...
                    </div>
                </div>
            </div>
        </>

)
}

export default AdminDash;