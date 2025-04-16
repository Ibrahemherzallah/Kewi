import { Nav, Navbar,NavLinks, NavBrand, NavIcons } from '../components/navbar/navbar.jsx';
import logo from '../assets/logo.png'
import logoText from '../assets/LogoText.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../components/navbar/navbar.module.css';
import { IconBtn } from '../components/icons/icons.jsx';
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Sidebar from "../components/sidebar/sideBar.jsx";

const UserNavBar = ({isSidebarOpen,setSidebarOpen}) => {
  const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <Navbar user={true}>
                <Nav>
                    <NavBrand>
                        <div className='d-flex gap-3 w-100'>
                            <img className={style.logoImg} src={logo} alt="" />
                            <img className={` mt-4 ${style.logoTextImg}`} src={logoText} alt="" />
                        </div>
                    </NavBrand>
                    <NavIcons>
                        <IconBtn><FontAwesomeIcon icon={faSun} style={{color:'var(--primary)',fontSize:'1.5rem'}} /></IconBtn>
                        <IconBtn variant={'square'} size={'md'} onClick={() => setSidebarOpen(true)}><FontAwesomeIcon icon={faStore} style={{color:'var(--primary)',fontSize:'1.5rem'}}/></IconBtn>
                    </NavIcons>
                </Nav>
                <NavLinks>
                    <nav className={`navbar navbar-expand-lg bg-{var(--bg-color)}`}>
                        <div className="container-fluid p-0">
                            <a  className={`nav-item navbar-brand m-0 ${style.navItem}`} href="#" >الرئيسية</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className={`navbar-nav d-flex gap-4`}>
                                    <li className={`nav-item dropdown ${style.navItem} position-relative`}>
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                           aria-expanded="false"
                                           onClick={()=>setIsOpen(!isOpen)}
                                        >
                                            الحقائب
                                        </a>
                                        <ul className={`p-2 ${isOpen ? 'd-block' : 'd-none'} ${style.navDropDown} position-absolute`} >
                                            <li className={`${style.dropDownItemLi}`}><a className={`${style.dropDownItem}`} href="#">حقائب يد</a></li>
                                            <li className={`${style.dropDownItemLi}`}><a className={`${style.dropDownItem}`} href="#">حقائب ظهر</a></li>
                                            <li className={`${style.dropDownItemLi}`}><a className={`${style.dropDownItem}`} href="#">حقائب</a></li>
                                        </ul>
                                    </li>
                                    <li className={`nav-item ${style.navItem}`}>
                                        <a className="nav-link" aria-current="page" href="#">العطور</a>
                                    </li>
                                    <li className={`nav-item ${style.navItem}`}>
                                        <a className="nav-link" href="#">الاكسسوارات</a>
                                    </li>
                                    <li className={`nav-item ${style.navItem}`}>
                                        <a className="nav-link" href="#">العروض</a>
                                    </li>
                                    <li className={`nav-item ${style.navItem}`}>
                                        <a className="nav-link" href="#">قريبا</a>
                                    </li>
                                    <li className={`nav-item ${style.navItem}`}>
                                        <a className="nav-link" href="#">اخرى</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </NavLinks>
            </Navbar>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>

  )
}

export default UserNavBar;