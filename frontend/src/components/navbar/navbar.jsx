import style from './navbar.module.css';

export function Navbar ({children, user}) {
  return(
    <header className={`${user ? style.userNavBar : style.navBar}`}>{children}</header>
  )
}

export function Nav ({children}) {
  return(
    <nav className={`d-flex justify-content-between ${style.nav}`}>{children}</nav>
  )
}

export function NavLinks ({children}) {
  return(
    <div className={`${style.navLinks}`}>{children}</div>
  )
}

export function NavBrand ({children}) {
  return(
    <div className={style.navBrand}>{children}</div>
  )
}

export function NavIcons ({children}) {
  return(
    <div className={style.navIcons}>{children}</div>
  )
}