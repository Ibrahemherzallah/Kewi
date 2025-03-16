import style from './button.module.css';

const Button = ({variant,size,children}) => {
    return(
      <button className={`d-flex gap-2 ${style.btn} ${style[variant]} ${style[size]}`}>{children}</button>
    )
}
export default Button;