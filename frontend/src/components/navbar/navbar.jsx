import style from './navbar.module.css';

export function Navbar ({children}) {
  return(
    <header className={`pb-0 ${style.navBar}`}>{children}</header>
  )
}

export function Nav ({children}) {
  return(
    <nav className={`d-flex justify-content-between ${style.nav}`}>{children}</nav>
  )
}

export function NavLinks ({children}) {
  return(
    <ul className={`px-0 ${style.navLinks}`}>{children}</ul>
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