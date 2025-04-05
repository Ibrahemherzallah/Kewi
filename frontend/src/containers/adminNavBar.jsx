import {Navbar, Nav, NavBrand, NavIcons} from "../components/navbar/navbar.jsx";
import style from "../components/navbar/navbar.module.css";
import logo from "../assets/logo.png";
import logoText from "../assets/LogoText.png";
import logoTextWhite from "../assets/logoTextWhite2.png";
import {IconBtn} from "../components/icons/icons.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router";
import Button from "../components/button/button.jsx";
import {useContext} from "react";
import {UserContext} from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import {ThemeContext} from "../context/themeContext.jsx"; // ✅ Import useNavigate


const AdminNav = () => {

    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate(); // ✅ Initialize navigate function
    const {isDark,setIsDark} = useContext(ThemeContext);

        const handleLogout = () => {
            fetch('http://localhost:5001/auth/logout', {
                method: 'POST',
                credentials: 'include', // Important for sending session cookies
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.message); // Logged out successfully
                    localStorage.removeItem("user");
                    setUser(null);
                    window.location.href = "/login"; // Redirect to login page
                })
                .catch(error => {
                    console.error("Logout failed:", error);
                    // Even if the backend fails, clear frontend data just in case
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                });

        };
        return(
            <>
                <Navbar>
                    <Nav>
                        <NavBrand>
                            <div className='d-flex gap-3 w-100'>
                                <img className={style.logoImg} src={logo} alt="" />
                                <img className={`mt-4 ${style.logoTextImg} ${isDark ? style.dark : ''}`} src={isDark ? logoTextWhite : logoText} alt="" />
                            </div>
                        </NavBrand>
                        <NavIcons>
                            <IconBtn onClick={()=>{setIsDark(!isDark)}}><FontAwesomeIcon icon={isDark ? faMoon : faSun}  style={{color:'var(--nav-text)',fontSize:'1.5rem'}} /></IconBtn>
                        <button className={`btn border-0 fw-bold fs-5 ${style.logoutBtn}`} type="button" data-bs-toggle="modal" data-bs-target="#myModal2">Log out</button>
                    </NavIcons>
                </Nav>
            </Navbar>
            <div className="modal fade" id="myModal2" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitle">Log out</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to log out ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{handleLogout()}}>confirm logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminNav