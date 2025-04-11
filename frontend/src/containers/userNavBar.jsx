import { Nav, Navbar,NavLinks, NavBrand, NavIcons } from '../components/navbar/navbar.jsx';
import logo from '../assets/logo.png'
import logoText from '../assets/LogoText.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../components/navbar/navbar.module.css';
import { IconBtn } from '../components/icons/icons.jsx';
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const UserNavBar = () => {
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
          <IconBtn variant={'square'} size={'md'}><FontAwesomeIcon icon={faStore} style={{color:'var(--primary)',fontSize:'1.5rem'}}/></IconBtn>
        </NavIcons>
      </Nav>
      <NavLinks>
        <li><a href="">الرئيسية</a></li>
        <li className="dropdown">
            <a href="#" className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              الحقائب <i className="fas fa-chevron-down ms-2"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-start navDropDown">
              <li><a className="dropdown-item" href="#">حقائب يد</a></li>
              <li><a className="dropdown-item" href="#">حقائب ظهر</a></li>
              <li><a className="dropdown-item" href="#">حقائب سفر</a></li>
            </ul>  
          </li>
          <li><a href="">العطور</a></li>
          <li><a href="">الاكسسوارات</a></li>
          <li><a href="">الاطفال</a></li>
          <li><a href="">العروض</a></li>
          <li><a href="">اخرى</a></li>
      </NavLinks>
    </Navbar>
  )
}

export default UserNavBar;