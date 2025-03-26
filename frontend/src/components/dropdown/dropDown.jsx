import style from "./dropdown.module.css";

export const DropDown = ({size,label,isRequired,options}) => {
    console.log("The options is  : " , options);
    return(
        <div className={`${style[size]}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <select name="" id="" className={`mt-1 ${style.dropdown}`}>
                {
                    options?.map((option, index) => (
                        <option key={index} value={option}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    )
}