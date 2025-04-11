import style from "./dropdown.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import dropdown from "bootstrap/js/src/dropdown.js";
import {useState} from "react";

export const DropDown = ({size,label,isRequired,options,setSelected}) => {
    return(
        <div className={`${style[size]}`}>
            <span className={'fw-medium'}>{label} {isRequired && <span className={style.required}>*</span> } </span><br/>
            <select name="" id="" className={`mt-1 ${style.dropdown}`} onChange={e => {
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








export const UserDropDown = ({ size, options, dropdownType }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);

    return (
        <div className={`${style[size]}`} style={{ position: 'relative' }}>
            <button
                className={`d-flex justify-content-between align-items-center p-2 w-100 ${style.dropdownBtn}`}
                onClick={() => setShow(!show)}
            >
                {selected ? selected : dropdownType}
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={show ? style.icon : style.iconR}
                    style={{ fontSize: '1rem' }}
                />
            </button>

            <ul className={`${style.dropdownOptions} ${show ? style.dropdownShow : ''} mt-1`}>
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