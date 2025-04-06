import style from './icons.module.css' ;

export function IconBtn ({variant,size,children,...props}) {
  return(
    <button className={`${style.iconBtn} ${style[variant]} ${style[size]}`} {...props}>{children}</button>
  )
}
