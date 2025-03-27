    import {DropDown} from "../../../components/dropdown/dropDown.jsx";
    import {Input, InputTextarea} from "../../../components/input/input.jsx";
    import style from './modals.module.css';
    import { FaUpload } from "react-icons/fa"; // Import the upload icon
    import { useState } from "react";
    import Button from "../../../components/button/button.jsx";


    export const AddProductModal = ({category,brand}) => {
        const [images, setImages] = useState([]);
        const [isOnSale, setChecked] = useState(false);
        const genders = [{name:'رجالي'},{name:'نسائي'}];
        const sizes = [{name:'كبير'},{name: 'صغير'},{name: 'وسط'}];
        const colors = [{name:'برتقالي'},{name:'أسود'},{name:'رمادي'},{name:'أزرق'},{name:'وردي'},{name:'أحمر'},{name:'أصفر'},{name:'أبيض'}];
        const [gender,setSelectedGender] = useState();
        const [size,setSelectedSize] = useState();
        const [color,setSelectedColor] = useState();
        const [categoryId,setSelectedCategory] = useState();
        const [brandId,setSelectedBrand] = useState();
        const [name, setProductName] = useState();
        const [description, setDescription] = useState();
        const [customerPrice, setCustomerPrice] = useState();
        const [wholesalerPrice, setWholesalerPrice] = useState();
        const [salePrice, setSalePrice] = useState();
        const [isSoldOut,setIsSoldOut] = useState(false);

        // Handle file selection

        const handleFileChange = (event) => {
            const files = Array.from(event.target.files);

            if (files.length + images.length > 5) {
                alert("You can only upload up to 5 images.");
                return;
            }

            const newImages = files.map(file => ({
                file,
                url: URL.createObjectURL(file) // Create preview URL
            }));

            setImages([...images, ...newImages]);
        };

        // Remove selected image
        const removeImage = (index) => {
            const updatedImages = images.filter((_, i) => i !== index);
            setImages(updatedImages);
        };

        function handleSubmit(e) {
            // e.preventDefault();

            // Create a FormData object
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

            // Append image files
            images.forEach((image, index) => {
                formData.append("images", image.file);  // Ensure "images" matches the field name expected by the backend
            });

            // Send the request using fetch
            fetch('http://localhost:5001/admin/products', {
                method: 'POST',
                body: formData, // Send FormData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Product uploaded successfully:", data);
                })
                .catch(error => {
                    console.error("Error uploading product:", error);
                });
        }

        return (
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                                <DropDown isRequired={true} label={'Category'} size={'xlarge'} options={category} setSelected={setSelectedCategory} />
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <Input placeholder={'Enter product name'} isRequired={true} label={'Name'} usage={'modal'} size={'sm'} required onChange={(e=> setProductName(e.target.value))}/>
                                    <DropDown isRequired={false} size={'small'} label={'Brand'} options={brand} setSelected={setSelectedBrand} />
                                </div>
                                <div className={`mt-2`}>
                                    <InputTextarea placeholder={'Enter product name'} isRequired={false} label={'Description'} usage={'modal'} size={'xl'} type={'textarea'} style={{ height: '4rem' }} onChange={(e=> setDescription(e.target.value))} />
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <DropDown isRequired={false} size={'small'} label={'Gender'} options={genders} setSelected={setSelectedGender} />
                                    <DropDown isRequired={false} size={'small'} label={'Size'}  options={sizes} setSelected={setSelectedSize} />
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <Input placeholder={'Customer Price (per shekel)'} isRequired={true} label={'Price'} usage={'modal'} size={'sm'} required    onChange={(e=> setCustomerPrice(e.target.value))}/>
                                    <DropDown isRequired={false} size={'small'} label={'Color'} options={colors} setSelected={setSelectedColor} />
                                </div>
                                <div className={`d-flex justify-content-between mt-2`}>
                                    <Input placeholder={'Wholesale Price (per shekel)'} isRequired={true} label={'Wholesale Price'} usage={'modal'} size={'md'} onChange={(e=> setWholesalerPrice(e.target.value))} />
                                    <div className={`form-check form-switch ps-0 justify-content-between align-items-center d-flex pt-4 ${style.soldOutDiv}`}>
                                        <span className={'mt-1'}>Sold out</span>
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={()=> setIsSoldOut(!isSoldOut)} />
                                    </div>
                                </div>
                            <div className={`d-flex justify-content-between mt-3`}>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
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
                                           label={'New Price'} usage={'modal'} size={'md'} onChange={(e=> setSalePrice(e.target.value))}/>
                                )}
                                {/* Preview Uploaded Images */}
                                <div className="d-flex mt-3">
                                    {images.map((image, index) => (
                                        <div key={index} className={`${style.imagePreview}`}>
                                            <img src={image.url} alt="Preview" className="img-thumbnail me-2" style={{ width: 50, height: 50 }} />
                                            <button type="button" className="btn btn-danger btn-sm" style={{fontSize:'0.5rem',padding:'0.2rem 0.3rem'}} onClick={() => removeImage(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-center">
                            <Button variant={'secondary'} size={'xxs'} type='submit'>Add</Button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };