    import {DropDown} from "../../../components/dropdown/dropDown.jsx";
    import {Input, InputTextarea} from "../../../components/input/input.jsx";
    import style from './modals.module.css';
    import { FaUpload } from "react-icons/fa"; // Import the upload icon
    import { useState } from "react";
    import Button from "../../../components/button/button.jsx";


    export const AddProductModal = ({category,brand}) => {
        const [images, setImages] = useState([]);
        const [isChecked, setChecked] = useState(true);
        const gender = [{name:'رجالي'},{name:'نسائي'}];
        const size = [{name:'كبير'},{name: 'صغير'},{name: 'وسط'}];
        const color = [{name:'برتقالي'},{name:'أسود'},{name:'رمادي'},{name:'أزرق'},{name:'وردي'},{name:'أحمر'},{name:'أصفر'},{name:'أبيض'}];
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

        return (
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <DropDown isRequired={true} label={'Category'} size={'xlarge'} options={category}  />
                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Enter product name'} isRequired={true} label={'Name'} usage={'modal'} size={'sm'} />
                                <DropDown isRequired={false} size={'small'} label={'Brand'} options={brand} />
                            </div>
                            <div className={`mt-2`}>
                                <InputTextarea placeholder={'Enter product name'} isRequired={false} label={'Description'} usage={'modal'} size={'xl'} type={'textarea'} style={{ height: '4rem' }} />
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <DropDown isRequired={false} size={'small'} label={'Gender'} options={gender} />
                                <DropDown isRequired={false} size={'small'} label={'Size'}  options={size}/>
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Customer Price (per shekel)'} isRequired={true} label={'Price'} usage={'modal'} size={'sm'} />
                                <DropDown isRequired={false} size={'small'} label={'Color'} options={color}/>
                            </div>
                            <div className={`d-flex justify-content-between mt-2`}>
                                <Input placeholder={'Wholesale Price (per shekel)'} isRequired={true} label={'Wholesale Price'} usage={'modal'} size={'md'} />
                                <div className={`form-check form-switch ps-0 justify-content-between align-items-center d-flex pt-4 ${style.soldOutDiv}`}>
                                    <span className={'mt-1'}>Sold out</span>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
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
                                    <input type='file' id="fileInput"
                                           accept="image/*"
                                           multiple
                                           onChange={handleFileChange}
                                           hidden/>
                                    <label htmlFor="fileInput">
                                        <FaUpload className="upload-icon" />
                                        Upload images
                                    </label>
                                </div>
                            </div>
                            {isChecked && (
                                <Input placeholder={'New Price (per shekel)'} isRequired={true}
                                       label={'New Price'} usage={'modal'} size={'md'}/>
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
                            <Button variant={'secondary'} size={'xxs'}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };