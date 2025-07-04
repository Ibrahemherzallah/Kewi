import { Nav, Navbar,NavLinks, NavBrand, NavIcons } from '../components/navbar/navbar.jsx';
import logo from '../assets/logo.png'
import logoText from '../assets/LogoText.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../components/navbar/navbar.module.css';
import { IconBtn } from '../components/icons/icons.jsx';
import {faMoon, faStore} from "@fortawesome/free-solid-svg-icons";
import { faSun } from '@fortawesome/free-regular-svg-icons';
import {useContext, useState} from "react";
import Sidebar from "../components/sidebar/sideBar.jsx";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router";
import UserDetailsModal from "./modals/userDetailsModal.jsx";
import {UserContext} from "../context/userContext.jsx";
import {ThemeContext} from "../context/themeContext.jsx";
import {CartContext} from "../context/cartContext.jsx";
import logoTextWhite from "../assets/logoTextWhite2.png";
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const UserNavBar = ({isSidebarOpen,setSidebarOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const {isDark, setIsDark} = useContext(ThemeContext);
  const {products,setProducts} = useContext(CartContext);

    const handleLogout = () => {
        fetch('https://kewi.ps/auth/logout', {
            method: 'POST',
            credentials: 'include', // Important for sending session cookies
        })
            .then(res => res.json())
            .then(data => {
                localStorage.removeItem("user");
                setUser(null);
                window.location.href = "/"; // Redirect to login page
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
            <Navbar user={true}>
                <Nav>
                    <NavBrand>
                        <div className='d-flex gap-3 w-100'>
                            <img className={style.logoImg} src={logo} alt="" />
                            <img className={`${style.logoTextImg} ${isDark ? style.dark : ''}`} src={isDark ? logoTextWhite : logoText} alt="" />
                        </div>
                    </NavBrand>
                    <NavIcons>

                        <IconBtn onClick={() => {
                            setIsDark(!isDark)
                        }}><FontAwesomeIcon icon={isDark ? faMoon : faSun} className={`${style.modeIcon}`}
                                            style={{color: 'var(--nav-text)'}}/></IconBtn>
                        { user?.isWholesaler &&
                            <div className="dropdown">
                                    <FontAwesomeIcon className={`${style.personIconNavBar}`} icon={faUserTie} type="button" data-bs-toggle="dropdown" aria-expanded="false" />
                                <div className="dropdown-menu p-3">
                                            <h5><span className={`fw-bold fs-5`}>Name :</span> {user.userName}</h5>
                                          <button className={`btn border-0 fw-semibold fs-5 ${style.logoutBtn} p-0`} type="button" data-bs-toggle="modal" data-bs-target="#myModal8">
                                              <FontAwesomeIcon icon={faRightFromBracket} size="md"  />&nbsp;
                                              Log out
                                          </button>
                                </div>
                            </div>
                        }


                        <div className={`position-relative`}>
                            {
                                products?.length > 0 ?
                                    <div
                                        className={`${style.badge} ${isDark ? style.badgeDark : style.badgeLight}  position-absolute`}>
                                        {products?.length}
                                    </div> : null
                            }
                            <IconBtn variant={'square'} size={'md'} job={'store'}
                                     style={{border: isDark ? '2px solid #d9d9d9' : '2px solid var(--tertiary)'}}
                                     onClick={() => setSidebarOpen(true)}><FontAwesomeIcon icon={faStore}
                                     style={{color: 'var(--nav-text)'}}
                                     className={`${style.storeIcon}`} />
                            </IconBtn>
                        </div>
                    </NavIcons>
                </Nav>
                <NavLinks>
                    <nav className={`navbar navbar-expand-lg bg-{var(--bg-color)} ${style.bootstrapNav}`}>
                        <div className="container-fluid p-0">
                            <Link className={`nav-item navbar-brand m-0 ${isDark ? style.navItemDark : style.navItem}`}
                                  to={'/'}>الرئيسية</Link>
                            <button className={`navbar-toggler ${style.navbarToggler}`} type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className={`navbar-toggler-icon ${style.navbarTogglerIcon}`}
                                      style={{color: 'var(--text-color)'}}></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className={`navbar-nav d-flex ${style.navbarNav}`}>
                                    <li className={`nav-item dropdown ${isDark ? style.navItemDark : style.navItem} position-relative`}>
                                        <a className="nav-link dropdown-toggle" href="#" role="button"
                                           data-bs-toggle="dropdown"
                                           aria-expanded="false"
                                           onClick={() => setIsOpen(!isOpen)}
                                        >
                                            الحقائب
                                        </a>
                                        <ul className={`p-2 ${isOpen ? 'd-block' : 'd-none'} ${style.navDropDown} position-absolute`}>
                                            <li className={`${style.dropDownItemLi}`}><Link
                                                to={'/category/67fd7361d3d9f99f95edff41'}
                                                state={{catName: 'حقائب اليد'}} className={`${style.dropDownItem}`}>حقائب
                                                يد</Link></li>
                                            <li className={`${style.dropDownItemLi}`}><Link
                                                to={'/category/6803f9b235efe305218f99e7'} state={{catName: 'حقائب ظهر'}}
                                                className={`${style.dropDownItem}`} href="#">حقائب ظهر</Link></li>
                                            <li className={`${style.dropDownItemLi}`}><Link
                                                to={'/category/680fd54f4dde5779298c2701'} state={{catName: 'حقائب سفر'}}
                                                className={`${style.dropDownItem}`} href="#">حقائب سفر</Link></li>
                                            <li className={`${style.dropDownItemLi}`}><Link
                                                to={'/category/680fd7654dde5779298c273e'} state={{catName: 'حزدان يد'}}
                                                className={`${style.dropDownItem}`} href="#">جزدان يد</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`nav-item ${isDark ? style.navItemDark : style.navItem}`}>
                                        <Link to={'/category/6803f9c535efe305218f99f2'} state={{catName: 'العطور'}}
                                              className="nav-link" aria-current="page" href="#">العطور</Link>
                                    </li>
                                    <li className={`nav-item ${isDark ? style.navItemDark : style.navItem}`}>
                                        <Link to={'/category/67ff75611520f910df910f88'} state={{catName: 'الاكسسوارات'}}
                                              className="nav-link">الاكسسوارات</Link>
                                    </li>
                                    <li className={`nav-item ${isDark ? style.navItemDark : style.navItem}`}>
                                        <Link to={'/category/6803fb1535efe305218f9a10'} state={{catName: 'العروض'}}
                                              className="nav-link">العروض</Link>
                                    </li>
                                    <li className={`nav-item ${isDark ? style.navItemDark : style.navItem}`}>
                                        <Link to={'/category/6804dfd569ff9ce587677f0c'} state={{catName: 'المنتجات'}}
                                              className="nav-link">قريبا</Link>
                                    </li>
                                    <li className={`nav-item ${isDark ? style.navItemDark : style.navItem}`}>
                                        <Link to={'/category/6804df8869ff9ce587677eba'} state={{catName: 'المنتجات'}}
                                              className="nav-link">اخرى</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </NavLinks>
            </Navbar>
            <div className="modal fade" id="myModal8" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitle">Log out</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
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
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <UserDetailsModal></UserDetailsModal>
        </>

  )
}

export default UserNavBar;