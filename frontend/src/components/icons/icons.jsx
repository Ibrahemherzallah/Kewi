import style from './icons.module.css' ;

export function IconBtn ({variant,size,children,job,color,...props}) {
    return(
      <button className={`${style.iconBtn} ${style[variant]} ${style[size]} ${style[color]} ${style[job]}`} {...props}>{children}</button>
    )
}
