import style from "./dropdown.module.css";

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