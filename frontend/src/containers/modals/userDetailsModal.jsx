import {InputArabic, InputArabicTextarea, InputTextarea} from "../../components/input/input.jsx";
import style from "./userDetailsModal.module.css";
import {DropDown, UserModalDropDown} from "../../components/dropdown/dropDown.jsx";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/button/button.jsx";
import {CartContext} from "../../context/cartContext.jsx";
import {UserContext} from "../../context/userContext.jsx";
import {ThemeContext} from "../../context/themeContext.jsx";
import useUserData from "../../hooks/useUserDate.jsx";
import {useTranslation} from "react-i18next";

const UserDetailsModal = () => {

    const [cities,setCities] = useState(
        [
            {name:"الضفة الغربية",region:'w'},
            {name: "الداخل",region:'d'},
            {name:"القدس",region:'q'}
        ]);
    const [selectedCity,setSelectedCity] = useState(null);
    const [selectedRegion,setSelectedRegion] = useState(null);
    const [notes,setNotes] = useState(null);
    const [deliveryType, setDeliveryType] = useState([{name : "مستعجل",duration: "1 - 2 يوم"}, {name : "عادي",duration: "3 - 5 يوم"}]);
    const [selectedType,setSelectedType] = useState(null);
    const [deliveryPrice,setDeliveryPrice] = useState(null);
    const [error, setError] = useState('');
    const [cName,setCName] = useState(null);
    const [cNumber,setCNumber] = useState(null);
    const [cAddress,setCAddress] = useState(null);
    const {products,setProducts} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const {isDark,setISDark} = useContext(ThemeContext);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInSite, setIsInSite] = useState(false);
    const userData = useUserData(user?._id);
    const { t,i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    useEffect(() => {
        if(userData && userData.isWholesaler){
            setCName(userData.userName);
            setCNumber(userData.phone);
            setCAddress(userData.address);
        }
    });
    console.log("the userData is ", userData);
    console.log("the user is ", user);

    const validateForm = () => {
        if(!isInSite){
            if (!selectedCity) {
                setError("يجب ادخال المدينة");
                return false;
            }
            if (!selectedType) {
                setError("يجب ادخال نوع التوصيل");
                return false;
            }
            if (!deliveryPrice) {
                setError("لم يتم تحديد سعر التوصيل");
                return false;
            }
        }
        if (cNumber.length < 10) {
            setError("الرقم المدخل خاطئ");
            return false;
        }
        return true; // ✅ All validations passed
    }

    const handleSend = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) return;

        setError(null);
        setIsLoading(true);

        try {
            // Build the products array including color
            const productList = products.map((item) => {
                const unitPrice = user?.isWholesaler
                    ? item.wholesalerPrice
                    : item.isOnSale
                        ? item.salePrice
                        : item.customerPrice;

                return {
                    productId: item._id,
                    name: item.name,
                    brandId: item?.categoryId?.name,
                    id: item.id,
                    quantity: item.numOfItems,
                    color: item?.color || "",
                    price: unitPrice, // send unit price
                };
            });
            // Calculate total price on frontend
            const totalPrice = productList.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            console.log("totalPrice, " , totalPrice);
            const payload = {
                cName,//
                cNumber,//
                cAddress,//
                cCity: selectedCity || "زبون المحل",//
                delivery: selectedType,//
                notes,//
                products: productList,
                totalPrice: totalPrice.toFixed(2), // send pre-calculated total

            };

            // Send one purchase request
            const response = await fetch("https://kewi.ps/user/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("فشل في إرسال البيانات");

            const result = await response.json();
            console.log("تم إرسال البيانات بنجاح:", result);

            for (let item of products) {
                const stockResponse = await fetch("https://kewi.ps/user/product/update-stock", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: item._id,
                        quantity: item.numOfItems,
                    }),
                });

                const data = await stockResponse.json().catch(() => ({})); // read JSON safely

                if (!stockResponse.ok) {
                    // ❌ Stop the loop and show error to user
                    throw new Error(data.message || `فشل في تحديث مخزون المنتج ${item.name}`);
                }
            }

            // Send one WhatsApp message
            await fetch("https://kewi.ps/user/purchase/send-whatsapp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cName,
                    cNumber,
                    cAddress,
                    cCity: selectedCity,
                    notes,
                    totalPrice: totalPrice.toFixed(2),
                    delivery: selectedType,
                    type: user?.isWholesaler ? "تاجر" : "زبون",
                    products: products.map((item) => ({
                        name: item.name,
                        unitPrice: user?.isWholesaler
                            ? item.wholesalerPrice
                            : item.isOnSale
                                ? item.salePrice
                                : item.customerPrice,
                        productId: item.id,
                        totalPrice, // send pre-calculated total
                        brandId: item?.categoryId?.name,
                        quantity: item.numOfItems,
                        color: item?.color || "",
                        price: user?.isWholesaler
                            ? item.wholesalerPrice
                            : item.isOnSale
                                ? item.salePrice
                                : item.customerPrice,
                    })),
                }),
            });

            setShowToast(true);
            // setTimeout(() => window.location.reload(), 1000);
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("exampleModal9")
            );
            modal.hide();
        } catch (err) {
            console.error("Error sending data or updating stock:", err);
            // show backend error message (e.g. "كمية غير كافية من منتج test")
            setError(err.message || "حدث خطأ أثناء إرسال البيانات");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setError('');
    },[])
    useEffect(() => {
        const cityData = cities.find(city => city.name === selectedCity);
        if (cityData) {
            setSelectedRegion(cityData.region);
        }
    }, [selectedCity, cities]);
    useEffect(() => {
        if(selectedRegion && selectedType){
            if(selectedRegion === 'w'){
                setDeliveryPrice(selectedType ===  'مستعجل' ? 20 : 10)
            }
            else if (selectedRegion === 'd'){
                setDeliveryPrice(selectedType ===  'مستعجل' ? 70 : 50)
            }
            else if (selectedRegion === 'q'){
                setDeliveryPrice(selectedType ===  'مستعجل' ? 30 : 20)
            }
        }
    }, [selectedRegion,selectedType]);


    return (
        <>
            <div className={`modal fade ${isArabic ? style.ltr : style.rtl}`} id="exampleModal9" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                        <div className={`modal-header ${style.modalHeader}`}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{t("purchaseModal.header")}</h1>
                            <button type="button" className="btn-close m-0" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSend}>
                            <div className="modal-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className={`d-flex justify-content-between`}>
                                    <InputArabic usage={'modal'} placeholder={`${t("purchaseModal.numberPlaceholder")}`} isRequired={true} required label={`${t("purchaseModal.number")}`} size={'sm'} value={cNumber} onChange={(e)=>{setCNumber(e.target.value)}}></InputArabic>
                                    <InputArabic usage={'modal'} placeholder={`${t("purchaseModal.namePlaceholder")}`} isRequired={true} required label={`${t("purchaseModal.fullName")}`} value={cName} size={'sm'} onChange={(e)=>{setCName(e.target.value)}}></InputArabic>
                                </div>
                                <div className={`d-flex justify-content-between mt-4`}>
                                    <UserModalDropDown options={cities} usage={'modal'} isRequired={true} label={`${t("purchaseModal.area")}`} size={'small'} setSelected={setSelectedCity} able={isInSite}></UserModalDropDown>
                                    <InputArabic usage={'modal'} placeholder={`${t("purchaseModal.cityPlaceholder")}`} isRequired={true} label={`${t("purchaseModal.city")}`} size={'sm'} required value={isInSite ? 'جنين' : cAddress} onChange={(e)=>{setCAddress(e.target.value)}} able={isInSite}></InputArabic>
                                </div>
                                <div className={`d-flex justify-content-between mt-4`}>
                                    <div className={`w-50 d-flex align-items-end justify-content-between px-4 pb-1`}><span className={`ps-3`}>{deliveryPrice ? `₪ ${deliveryPrice}` : '₪0.00'} </span><span className={`fw-bold fs-6`}>{t("purchaseModal.deliveryPrice")}</span> </div>
                                    <UserModalDropDown options={deliveryType} usage={'modal'} isRequired={true} label={`${t("purchaseModal.deliveryType")}`} size={'xsmall'} setSelected={setSelectedType} able={isInSite}></UserModalDropDown>
                                </div>
                                {
                                    userData && !userData.isWholesaler && (
                                        <div className={`form-check form-switch ps-0 gap-3 justify-content-end align-items-center d-flex pt-3 ${style.soldOutDiv}`}>
                                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isInSite} onChange={()=> setIsInSite(!isInSite)} />
                                            <span>{t("purchaseModal.inMarket")}</span>
                                        </div>
                                    )
                                }

                                <div className={`d-flex justify-content-between mt-2`}>
                                    <InputArabicTextarea placeholder={`${t("purchaseModal.notePlaceholder")}`} isRequired={false} label={`${t("purchaseModal.notes")}`} usage={'modal'} size={'xl'} type={'textarea'} style={{ height: '4rem' }} value={notes} onChange={(e=> setNotes(e.target.value))} />
                                </div>
                            </div>
                            <p className={`text-center ${style.note}`}><span className={`fw-bold`}>{t("purchaseModal.note")} : </span> {t("purchaseModal.warningSentence")} </p>
                            <div className=" d-flex justify-content-center py-3">
                                <Button variant={'primary'} size={'xs'} type='submit'>{isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        ${t("purchaseModal.sending")}
                                    </>
                                ) : (
                                    t("purchaseModal.send")
                                )}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Toast Notification */}
            <div className={`toast-container position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
                <div className={`toast align-items-center text-bg-success border-0 ${showToast ? "show" : "hide"}`}>
                    <div className="d-flex">
                        <div className="toast-body">
                            تم إرسال البيانات بنجاح
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowToast(false)}
                        ></button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserDetailsModal;