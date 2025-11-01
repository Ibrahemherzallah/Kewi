import style from './input.module.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";

export const Input = ({placeholder,label,isRequired=false,size,variant,usage,type,...props}) => {
    return (
        <div className={`${style[variant]} ${style[size]}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <input className={ `mt-1 ${style.input} ${style[usage]}`} placeholder={placeholder} type={type} {...props}/>
        </div>
    )
}

export const SearchInput = ({placeholder,...props}) => {
    return(
        <div className={ `d-flex align-items-center ${style.inputDiv}`}>
            <FontAwesomeIcon style={{marginBottom:'2px'}} icon={faMagnifyingGlass} size="md" color="gray" />
            <input className={style.inputWithIcon} type="text" placeholder={placeholder} {...props}/>
        </div>
    );
}


export const InputTextarea = ({placeholder,label,isRequired=false,size,variant,usage,...props}) => {
    return (
        <div className={`${style[variant]} ${style[size]} `}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <textarea className={ `mt-1 ${style.input} ${style[usage]} ${style.textArea}`} placeholder={placeholder}  {...props}/>
        </div>
    )
}

export const InputArabic = ({placeholder,label,isRequired=false,size,variant,usage,type,able,...props}) => {
    const { t,i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    return (
        <div className={`${style[variant]} ${style[size]} ${style.inputArabic}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <input className={ `mt-1 ${style.input} ${style[usage]} ${isArabic ? style.ltr : style.rtl}`} placeholder={placeholder} type={type} disabled={able} {...props}/>
        </div>
    )
}


export const InputArabicTextarea = ({placeholder,label,isRequired=false,size,variant,usage,...props}) => {
    const { t,i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    return (
        <div className={`${style[variant]} ${style[size]} ${style.inputArabic}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <textarea className={ `mt-1 ${style.input} ${style[usage]} ${isArabic ? style.ltr : style.rtl}`} placeholder={placeholder}  {...props}/>
        </div>
    )
}