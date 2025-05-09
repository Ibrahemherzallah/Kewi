import {InputArabic, InputArabicTextarea, InputTextarea} from "../../components/input/input.jsx";
import style from "./userDetailsModal.module.css";
import {DropDown, UserModalDropDown} from "../../components/dropdown/dropDown.jsx";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/button/button.jsx";
import {CartContext} from "../../context/cartContext.jsx";
import {UserContext} from "../../context/userContext.jsx";
import {ThemeContext} from "../../context/themeContext.jsx";

const UserDetailsModal = () => {

    const [cities,setCities] = useState([{name:"الضفة الغربية",region:'w'},{name: "الداخل",region:'d'}]);
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


    const validateForm = () => {
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
        if (cNumber.length < 10) {
            setError("الرقم المدخل خاطئ");
            return false;
        }
        return true; // ✅ All validations passed
    }

    const handleSend = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        setError(null);


        for (let i = 0; i < products.length; i++) {
            const payload = {
                cName,
                cNumber,
                cAddress,
                cCity: selectedCity,
                price: user?.isWholesaler ? products[i].wholesalerPrice : products[i].isOnSale ? products[i].salePrice : products[i].customerPrice,
                numOfItems: products[i].numOfItems,
                delivery: selectedType,
                id: products[i].id,
                notes,
            };
            setIsLoading(true);
            try {
                const response = await fetch('https://kewi.ps/user/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error('فشل في إرسال البيانات');
                }

                const result = await response.json();
                console.log('تم إرسال البيانات بنجاح:', result);

                // Now update the stock in the backend
                await fetch('https://kewi.ps/user/product/update-stock', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: products[i]._id,
                        quantity: products[i].numOfItems
                    }),
                });

                console.log('تم تحديث المخزون بنجاح');

                await fetch('https://kewi.ps/user/purchase/send-whatsapp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cName,
                        cNumber,
                        cAddress,
                        notes,
                        cCity: selectedCity,
                        price: products[i].isOnSale ? products[i].salePrice : products[i].customerPrice,
                        numOfItems: products[i].numOfItems,
                        delivery: selectedType,
                        id: products[i].id,
                        name: products[i].name,
                        brandId: products[i]?.categoryId?.name,
                        type: user?.isWholesaler ?  'تاجر' : 'زبون'
                    }),
                });


            } catch (err) {
                console.error('Error sending data or updating stock:', err);
                setError('حدث خطأ أثناء إرسال البيانات');
                setIsLoading(false); // <-- Stop loading on error
                return;
            } finally {
                setIsLoading(false); // after everything
            }
        }
        setShowToast(true);
        setIsLoading(false); // <-- Stop loading
        setTimeout(() => window.location.reload(), 1000); // Give time for toast to show
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal9'));
        modal.hide();
        // window.location.reload();
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
        }
    }, [selectedRegion,selectedType]);


    return (
        <>
            <div className="modal fade" id="exampleModal9" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                        <div className={`modal-header ${style.modalHeader}`}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">المعلومات المطلوبة</h1>
                            <button type="button" className="btn-close m-0" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSend}>
                            <div className="modal-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className={`d-flex justify-content-between`}>
                                    <InputArabic usage={'modal'} placeholder={'قم بادخال الرقم'} isRequired={true} required label={"الرقم"} size={'sm'} onChange={(e)=>{setCNumber(e.target.value)}}></InputArabic>
                                    <InputArabic usage={'modal'} placeholder={'قم بادخال الاسم'} isRequired={true} required label={"الاسم الكامل"} size={'sm'} onChange={(e)=>{setCName(e.target.value)}}></InputArabic>
                                </div>
                                <div className={`d-flex justify-content-between mt-4`}>
                                    <UserModalDropDown options={cities} usage={'modal'} isRequired={true} label={"المنطقة"} size={'small'} setSelected={setSelectedCity} ></UserModalDropDown>
                                    <InputArabic usage={'modal'} placeholder={'قم بادخال المدينة'} isRequired={true} label={"المدينة"} size={'sm'} required onChange={(e)=>{setCAddress(e.target.value)}}></InputArabic>
                                </div>
                                <div className={`d-flex justify-content-between mt-4`}>
                                    <div className={`w-50 d-flex align-items-end justify-content-between px-4 pb-1`}><span className={`ps-3`}>{deliveryPrice ? `₪ ${deliveryPrice}` : '₪0.00'} </span><span className={`fw-bold fs-6`}>سعر التوصيل</span> </div>
                                    <UserModalDropDown options={deliveryType} usage={'modal'} isRequired={true} label={"نوع التوصيل"} size={'xsmall'} setSelected={setSelectedType}></UserModalDropDown>
                                </div>
                                <div className={`d-flex justify-content-between mt-4`}>
                                    <InputArabicTextarea placeholder={'أية ملاحظات ؟'} isRequired={false} label={'ملاحظات'} usage={'modal'} size={'xl'} type={'textarea'} style={{ height: '4rem' }} value={notes} onChange={(e=> setNotes(e.target.value))} />
                                </div>
                            </div>
                            <p className={`text-center ${style.note}`}><span className={`fw-bold`}>ملاحظة : </span> بمجرد الضغط على زر الارسال سيتم ارسال الطلب الى شركة التوصيل وسيتم ايصال الطرد في أقرب وقت ممكن </p>
                            <div className=" d-flex justify-content-center py-3">
                                <Button variant={'primary'} size={'xs'} type='submit'>{isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        جاري الإرسال...
                                    </>
                                ) : (
                                    'ارسال'
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