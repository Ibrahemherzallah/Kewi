import {DropDown} from "../../../components/dropdown/dropDown.jsx";
import {Input, InputTextarea} from "../../../components/input/input.jsx";
import style from './modals.module.css';
import { FaUpload } from "react-icons/fa"; // Import the upload icon
import {useContext, useEffect, useRef, useState} from "react";
import Button from "../../../components/button/button.jsx";
import {ThemeContext} from "../../../context/themeContext.jsx";


export const AddProductModal = ({category,brand,product,isUpdated}) => {
    const [images, setImages] = useState([]);
    const [isOnSale, setChecked] = useState(false);
    const genders = [{name:'رجالي'},{name:'نسائي'}];
    const sizes = [{name:'كبير'},{name: 'صغير'},{name: 'وسط'}];
    const colors = [{name:'برتقالي'},{name:'أسود'},{name:'رمادي'},{name:'أزرق'},{name:'وردي'},{name:'أحمر'},{name:'أصفر'},{name:'أبيض'}];
    const [gender,setSelectedGender] = useState('');
    const [size,setSelectedSize] = useState('');
    const [color,setSelectedColor] = useState('');
    const [categoryId,setSelectedCategory] = useState('');
    const [brandId,setSelectedBrand] = useState('');
    const [id, setSelectedId] = useState('');
    const [stockNumber,setStockNumber] = useState('');
    const [name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [customerPrice, setCustomerPrice] = useState('');
    const [wholesalerPrice, setWholesalerPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [isSoldOut,setIsSoldOut] = useState(false);
    const [isSoon,setIsSoon] = useState(false);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const {isDark,setISDark} = useContext(ThemeContext);
    useEffect(() => {
        setErrors('');
        setProductName(product?.name || '');
        setDescription(product?.description || '');
        setSelectedId(product?.id || '');
        setSelectedCategory(product?.categoryId || '');
        setSelectedBrand(product?.brandId || '');
        setCustomerPrice(product?.customerPrice || '');
        setWholesalerPrice(product?.wholesalerPrice || '');
        setStockNumber(product?.stockNumber || '');
        setIsSoldOut(product?.isSoldOut || false);
        setIsSoon(product?.isSoon || false);
        setChecked(product?.isOnSale || false);
        setSalePrice(product?.salePrice || '');
        setImages(product?.images || []);
        setSelectedGender(product?.gender || '');
        setSelectedColor(product?.color || '');
        setSelectedSize(product?.size || '')
    }, [product]); // Trigger when product changes
    useEffect(() => {
        if (isUpdated && product) {
            const existingImages = product?.image?.map((url) => ({
                file: null, // Existing images don't have a file object
                url, // Existing image URL
            }));
            setImages(existingImages);
        }
    }, [isUpdated, product]);
    const validateForm = () => {
        if (!categoryId) {
            setErrors("Category is required");
            return false;
        }
        else if(!(images.length > 0 ) && !isUpdated){
            setErrors("Image is required");
            return false;
        }
        return true;
    };
    const handleFileChange = (event, index = null) => {
        const files = Array.from(event.target.files);

        if (files.length + images.length > 10) {
            alert("You can only upload up to 10 images.");
            return;
        }

        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file), // Create preview URL
        }));

        if (index !== null) {
            // Replace existing image with new one
            const updatedImages = [...images];
            updatedImages[index] = newImages[0]; // Replace only one image
            setImages(updatedImages);
        } else {
            // Add new images
            setImages([...images, ...newImages]);
        }
    };

    // Remove selected image
    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };
    const url = isUpdated ?
        `https://kewi.ps/admin/products/${product?._id}` :
        'https://kewi.ps/admin/products';

    const method = isUpdated ? 'PUT' : 'POST';

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true); // Start loading

        const formData = new FormData();

        // Append text data
        formData.append("name", name);
        formData.append("description", description);
        formData.append("categoryId", categoryId);
        formData.append("brandId", brandId);
        formData.append("id",id);
        formData.append("stockNumber",stockNumber);
        formData.append("gender", gender);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("customerPrice", Number(customerPrice));
        formData.append("wholesalerPrice", Number(wholesalerPrice));
        formData.append("isSoldOut", isSoldOut);
        formData.append("isOnSale", isOnSale);
        formData.append("isSoon", isSoon);
        formData.append("salePrice", salePrice);

        // Append image files
        images.forEach((image, index) => {
            formData.append("images", image.file);
        });

        // Send the request using fetch

        fetch(url, {
            method: method,
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setErrors(data.error);
                }
                else {
                    console.log(isUpdated ? "Product updated successfully:" : "Product uploaded successfully:", data);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal1'));
                    modal.hide();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error("Error uploading product:", error);
            }) .finally(() => {
            setLoading(false); // Stop loading
        });
    }
    useEffect(() => {
        const selectedBrand = brand?.find(item => item.id === brandId);
        setIsSoldOut(selectedBrand?.isFake || false)
    }, [brandId]);
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{isUpdated ? 'Update Product' : 'Add Product'}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="modal-body">
                            {errors && <div className="alert alert-danger">{errors}</div>}

                            <DropDown isRequired={true} label={'Category'} size={'xlarge'} options={category} selected={categoryId} setSelected={setSelectedCategory} />

                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Enter product name'} isRequired={true} label={'Name'} usage={'modal'} size={'sm'} required value={name}  onChange={(e) => setProductName(e.target.value)} />
                                <DropDown isRequired={false} size={'small'} label={'Brand'} options={brand} selected={brandId} setSelected={setSelectedBrand} />
                            </div>
                            <div className={`mt-2 d-flex justify-content-between align-items-center`}>
                                <InputTextarea placeholder={'Enter product name'} isRequired={false} label={'Description'} usage={'modal'} size={'md'} type={'textarea'} style={{ height: '4rem' }} value={description} onChange={(e=> setDescription(e.target.value))} />
                                <div className={``}>
                                    <Input placeholder={'Enter product id'} isRequired={true} label={'ID'} usage={'modal'} size={'xl'} required value={id} onChange={(e) => setSelectedId(e.target.value)} />
                                    <Input placeholder={'Enter item number in stock'} isRequired={true} label={'Number Of Items'} usage={'modal'} size={'xl'} required value={stockNumber} onChange={(e) => setStockNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <DropDown product={product} isRequired={false} size={'small'} label={'Gender'} options={genders} selected={gender} setSelected={setSelectedGender} />
                                <DropDown product={product} isRequired={false} size={'small'} label={'Size'}  options={sizes} selected={size} setSelected={setSelectedSize} />
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Customer Price'} isRequired={true} label={'Price'} usage={'modal'} size={'sm'} required value={customerPrice} onChange={(e) => setCustomerPrice(e.target.value)} />
                                <Input placeholder={'Product Color'} isRequired={false} size={'sm'} label={'Color'} usage={'modal'}  value={color} onChange={(e) => setSelectedColor(e.target.value)} />
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Wholesale Price (per shekel)'} isRequired={true} label={'Wholesale Price'} usage={'modal'} size={'md'} required value={wholesalerPrice} onChange={(e=> setWholesalerPrice(e.target.value))} />
                                <div className={`form-check form-switch ps-0 justify-content-between align-items-center d-flex pt-4 ${style.soldOutDiv}`}>
                                    <span className={'mt-1'}>Sold out</span>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isSoldOut} onChange={()=> setIsSoldOut(!isSoldOut)} />
                                </div>
                            </div>
                            <div className={`d-flex justify-content-between mt-3`}>

                                <div className={'d-flex gap-5'}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isOnSale}
                                               onChange={e => {setChecked(e.target.checked)}}/>
                                        <label className={`form-check-label ${style.onSale}`} htmlFor="flexCheckDefault">
                                            On Sale
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultt" checked={isSoon}
                                               onChange={e => {setIsSoon(e.target.checked)}}/>
                                        <label className={`form-check-label ${style.onSale}`} htmlFor="flexCheckDefaultt">
                                            Soon
                                        </label>
                                    </div>
                                </div>


                                <div className={`mt-2 ${style.fileUpload}`}>
                                    <input type='file' id="fileInputProduct"
                                           accept="image/*"
                                           multiple
                                           onChange={handleFileChange}
                                           hidden/>
                                    <label htmlFor="fileInputProduct">
                                        <FaUpload className="upload-icon" />
                                        Upload images
                                    </label>
                                </div>
                            </div>
                            {isOnSale && (
                                <Input placeholder={'New Price (per shekel)'} isRequired={true}
                                       label={'New Price'} usage={'modal'} size={'md'} required value={salePrice} onChange={(e=> setSalePrice(e.target.value))}/>
                            )}
                            <div className="d-flex mt-3">
                                {images.map((image, index) => (
                                    <div key={index} className={`${style.imagePreview}`}>
                                        <span className="mx-2">Img {index + 1}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)} // Replace image
                                            style={{ display: "none" }}
                                            id={`imageInput-${index}`}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            style={{ fontSize: "0.5rem", padding: "0.2rem 0.3rem" }}
                                            onClick={() => removeImage(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-center">
                            <Button variant={'secondary'} size={'xxs'} type='submit' disabled={loading}
                                    onClick={() => {
                                        if (!images || images.length === 0) {
                                            setErrors("Image is required");
                                            return;
                                        }
                                    }}
                            >
                                {loading ? 'Loading...' : (isUpdated ? 'Update' : 'Add')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};