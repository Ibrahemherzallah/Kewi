import {Navbar, Nav, NavBrand, NavIcons} from "../components/navbar/navbar.jsx";
import style from "../components/navbar/navbar.module.css";
import logo from "../assets/logo.png";
import logoText from "../assets/LogoText.png";
import {IconBtn} from "../components/icons/icons.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router";
import Button from "../components/button/button.jsx";


const AdminNav = () => {
    return(
       <Navbar>
           <Nav>
               <NavBrand>
                   <div className='d-flex gap-3 w-100'>
                       <img className={style.logoImg} src={logo} alt="" />
                       <img className={` mt-4 ${style.logoTextImg}`} src={logoText} alt="" />
                   </div>
               </NavBrand>
               <NavIcons>
                   <IconBtn><FontAwesomeIcon icon={faSun} style={{color:'var(--primary)',fontSize:'1.5rem'}} /></IconBtn>
                   <button className={`border-0 bg-white fw-bold fs-5 ${style.logoutBtn}`}>Log out</button>
               </NavIcons>
           </Nav>
       </Navbar>
    )
}

export default AdminNav