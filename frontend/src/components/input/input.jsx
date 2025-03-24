import style from './input.module.css';

export const Input = ({placeholder,label,isRequired=false,size,variant,usage,...props}) => {
    return (
        <div className={`${style[variant]} ${style[size]}`}>
            <span className={'fw-semibold'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <input className={ `mt-1 ${style.input} ${style[usage]}`} placeholder={placeholder} {...props}/>
        </div>
    )
}