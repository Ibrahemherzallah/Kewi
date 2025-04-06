import style from './button.module.css';

const   Button = ({variant,size,children,...props}) => {
    return(
      <button className={`d-flex gap-2 ${style.btn} ${style[variant]} ${style[size]} `} {...props}>{children}</button>
    )
}
export default Button;