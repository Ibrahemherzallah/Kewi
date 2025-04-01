    import {DropDown} from "../../../components/dropdown/dropDown.jsx";
    import {Input, InputTextarea} from "../../../components/input/input.jsx";
    import style from './modals.module.css';
    import { FaUpload } from "react-icons/fa"; // Import the upload icon
    import {useEffect, useRef, useState} from "react";
    import Button from "../../../components/button/button.jsx";


    export const AddProductModal = ({category,brand,product,isUpdated }) => {
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
        const [name, setProductName] = useState('');
        const [description, setDescription] = useState('');
        const [customerPrice, setCustomerPrice] = useState('');
        const [wholesalerPrice, setWholesalerPrice] = useState('');
        const [salePrice, setSalePrice] = useState('');
        const [isSoldOut,setIsSoldOut] = useState(false);
        const [errors, setErrors] = useState('');

        useEffect(()=>{
            setProductName('');
        },[])

        useEffect(() => {
            console.log("Thissssss product : " , product);
                    setProductName(product?.name || '');
                    setDescription(product?.description || '');
                    setSelectedCategory(product?.categoryId || '');
                    setSelectedBrand(product?.brandId || '');
                    setCustomerPrice(product?.customerPrice || '');
                    setWholesalerPrice(product?.wholesalerPrice || '');
                    setIsSoldOut(product?.isSoldOut || false);
                    setChecked(product?.isOnSale || false);
                    setSalePrice(product?.salePrice || '');
                    setImages(product?.images || []);
                    setSelectedGender(product?.gender || '');
                    setSelectedColor(product?.color || '');
                    setSelectedSize(product?.size || '')
        }, [product]); // Trigger when product changes
        console.log('name is : ' ,name);
        useEffect(() => {
            if (isUpdated && product) {
                // Convert existing image URLs into an array format like new images
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

            if (files.length + images.length > 5) {
                alert("You can only upload up to 5 images.");
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
            `http://localhost:5001/admin/products/${product?._id}` :
            'http://localhost:5001/admin/products' ;

        const method = isUpdated ? 'PUT' : 'POST';
        console.log("Thissssss setProductName is  :" , name)
        console.log("The description is  :" , description)
        console.log("The categoryId is  :" , categoryId)
        console.log("The brandId is  :" , brandId)
        console.log("The customerPrice is  :" , customerPrice)
        console.log("The gender is  :" , gender)

        console.log("The wholesalerPrice is  :" , wholesalerPrice)
        console.log("The isSoldOut is  :" , isSoldOut)
        console.log("The isOnSale is  :" , isOnSale)
        console.log("The salePrice is  :" , salePrice)
        console.log("The images is  :" , images)
        function handleSubmit(e) {
            e.preventDefault();
            if (!validateForm()) return;

            const formData = new FormData();

            // Append text data
            formData.append("name", name);
            formData.append("description", description);
            formData.append("categoryId", categoryId);
            formData.append("brandId", brandId);
            formData.append("gender", gender);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("customerPrice", Number(customerPrice));
            formData.append("wholesalerPrice", Number(wholesalerPrice));
            formData.append("isSoldOut", isSoldOut);
            formData.append("isOnSale", isOnSale);
            formData.append("salePrice", salePrice);
            console.log("///////////////////////////////////////////////////////////////////")

            // Append image files
            images.forEach((image, index) => {
                console.log("image", image);
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
                            console.log("Submitting product:", {
                                name,
                                description,
                                categoryId,
                                brandId,
                                gender,
                                size,
                                color,
                                customerPrice,
                                wholesalerPrice,
                                salePrice,
                                isSoldOut,
                                isOnSale
                            });
                            console.log(isUpdated ? "Product updated successfully:" : "Product uploaded successfully:", data);
                            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal1'));
                            modal.hide();
                        }
                    })
                    .catch(error => {
                        console.error("Error uploading product:", error);
                    })

        }

        return (
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
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
                                <div className={`mt-2`}>
                                    <InputTextarea placeholder={'Enter product name'} isRequired={false} label={'Description'} usage={'modal'} size={'xl'} type={'textarea'} style={{ height: '4rem' }} value={description} onChange={(e=> setDescription(e.target.value))} />
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <DropDown product={product} isRequired={false} size={'small'} label={'Gender'} options={genders} selected={gender} setSelected={setSelectedGender} />
                                    <DropDown product={product} isRequired={false} size={'small'} label={'Size'}  options={sizes} selected={size} setSelected={setSelectedSize} />
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <Input placeholder={'Customer Price'} isRequired={true} label={'Price'} usage={'modal'} size={'sm'} required value={customerPrice} onChange={(e) => setCustomerPrice(e.target.value)} />
                                    <DropDown isRequired={false} size={'small'} label={'Color'} options={colors} selected={color} setSelected={setSelectedColor}/>
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <Input placeholder={'Wholesale Price (per shekel)'} isRequired={true} label={'Wholesale Price'} usage={'modal'} size={'md'} required value={wholesalerPrice} onChange={(e=> setWholesalerPrice(e.target.value))} />
                                    <div className={`form-check form-switch ps-0 justify-content-between align-items-center d-flex pt-4 ${style.soldOutDiv}`}>
                                        <span className={'mt-1'}>Sold out</span>
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isSoldOut} onChange={()=> setIsSoldOut(!isSoldOut)} />
                                    </div>
                                </div>
                            <div className={`d-flex justify-content-between mt-3`}>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isOnSale}
                                               onChange={e => {setChecked(e.target.checked)}}/>
                                        <label className={`form-check-label ${style.onSale}`} htmlFor="flexCheckDefault">
                                            On Sale
                                        </label>
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
                            {/* Preview Uploaded Images */}
                            <div className="d-flex mt-3">
                                {images.map((image, index) => (
                                    <div key={index} className={`${style.imagePreview}`}>
                                        <img
                                            src={image.url}
                                            alt="Preview"
                                            className="img-thumbnail me-2"
                                            style={{ width: 50, height: 50 }}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)} // Replace image
                                            style={{ display: "none" }}
                                            id={`imageInput-${index}`}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm me-1"
                                            style={{ fontSize: "0.5rem", padding: "0.2rem 0.3rem" }}
                                            onClick={() => document.getElementById(`imageInput-${index}`).click()}
                                        >
                                            Replace
                                        </button>
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
                            <Button variant={'secondary'} size={'xxs'} type='submit' onClick={()=>{
                                if(!images) setError("You Should add an image")
                            }}>{isUpdated ? 'Update' : 'Add'}</Button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };