import style from "./dropdown.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";

export const DropDown = ({size,label,isRequired,options,selected,setSelected}) => {
    return(
        <div className={`${style[size]}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <select name="" id="" className={`mt-1 ${style.dropdown}`} value={label === "Gender" || label === "Size" || label === "Color" ?  selected : null}  onChange={e => {
                if(label === "Category" || label === "Brand"){
                    const selectedName = e.target.value;
                    const selectedCategory = options.find(option => option.name === selectedName);

                    setSelected(selectedCategory ? selectedCategory.id : "");
                }
                else {
                    setSelected(e.target.value)
                }
            }}>
                <option value="" disabled selected>-- Select an option --</option>
                {
                    options?.map((option, index) => (
                        <option key={index} value={option.name}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    )
}








export const UserDropDown = ({ size, options, dropdownType,selected,setSelected}) => {
    const [show, setShow] = useState(false);
    return (
        <div className={`${style[size]}`} style={{ position: 'relative' }}>
            <button className={`d-flex justify-content-between align-items-center w-100 fw-semibold ${style.dropdownBtn}`} onClick={() => setShow(!show)}>
                {selected ? selected : dropdownType}
                <FontAwesomeIcon icon={faCaretDown} className={show ? style.icon : style.iconR} />
            </button>

            <ul
                className={`${style.dropdownOptions} ${show ? style.dropdownShow : ''} mt-1`}
                style={{ display: show ? "block" : "none" }}
            >
                <li className="p-2" onClick={() => { setSelected(null); setShow(false); }}>
                    مسح الفلاتر
                </li>
                {options.map((option, index) => (
                    <li key={index} className="p-2" onClick={() => { setSelected(option); setShow(false); }}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};




export const UserModalDropDown = ({ size, label, isRequired, options = [], setSelected }) => {
    const isDeliveryType = options?.[0]?.duration !== undefined;

    return (
        <div className={`${style[size]}`}>
            <span className={'fw-medium d-block'} dir={'rtl'}>
                {label} {isRequired && <span className={style.required}>*</span>}
            </span>
            <select
                className={`mt-1 ${style.dropdown}`}
                defaultValue=""
                onChange={e => setSelected(e.target.value)}
            >
                <option value="" disabled>
                    {isDeliveryType ? '-- اختر نوع التوصيل --' : '-- اختر المدينة --'}
                </option>

                {options?.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name} {option.duration ? `- ${option.duration}` : ''}
                    </option>
                ))}
            </select>
        </div>
    );
};