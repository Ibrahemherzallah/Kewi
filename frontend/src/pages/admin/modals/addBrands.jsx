import {useContext, useEffect, useState} from "react";
import {Input, InputTextarea} from "../../../components/input/input.jsx";
import style from "./modals.module.css";
import {FaUpload} from "react-icons/fa";
import Button from "../../../components/button/button.jsx";
import {ThemeContext} from "../../../context/themeContext.jsx";

export const AddBrandsModal = ({product,isUpdated}) => {

    const [images, setImages] = useState();
    const [brandName,setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [isFake, setIsFake] = useState(false);
    const [error, setError] = useState('');
    const {isDark,setISDark} = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");


    useEffect(() => {
        setBrandName(product?.name || '');
        setDescription(product?.description || '');
        setIsFake(product?.isFake || false);
        if (product?.image) {
            setImages([{
                file: null,
                url: product.image
            }]);
        } else {
            setImages([]);
        }
    },[product])


    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get only the first selected file

        if (!file) return;// If no file is selected, do nothing

        const newImage = {
            file,
            url: URL.createObjectURL(file), // Create preview URL
        };

        setImages([newImage]); // Replace the existing image instead of adding to the list
    };
    // Remove selected image
    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };
    const url = isUpdated ?
        `https://kewi.ps/admin/brands/${product?._id}` :
        'https://kewi.ps/admin/brands';
    const method = isUpdated ? 'PUT' : 'POST';

    function handleOnSubmit (e){
        e.preventDefault();
        setLoading(true); // Start loading

        // Create a FormData object
        const formData = new FormData();
        formData.append("name", brandName);
        formData.append("description", description);
        formData.append("image", images[0].file);

        formData.append("isFake", isFake);

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setError(data.error);
                }
                else{
                    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal2'));
                    modal.hide();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error("Error uploading product:", error);
            }).finally(() => {
            setLoading(false); // Stop loading
        });
    }
    return (
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{isUpdated ? 'Update Brand' : 'Add Brand' }</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <Input placeholder={'Enter brand name'} isRequired={true}
                                   label={'Brand Name'} usage={'modal'} required value={brandName} onChange={(e)=>{setBrandName(e.target.value)}} />
                            <div className={`mt-2`}>
                                <InputTextarea placeholder={'Plz enter brand description'} isRequired={false} label={'Description'} usage={'modal'} size={'xl'}  style={{ height: '4rem' }} value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                            </div>
                            <div className={`d-flex justify-content-between mt-3`}>

                                <div className={`pt-2 ${style.fileUpload}`}>
                                    <input type='file' id="fileInputBrand"
                                           accept="image/*"
                                           multiple
                                           onChange={handleFileChange}
                                           hidden/>
                                    <label htmlFor="fileInputBrand">
                                        <FaUpload className="upload-icon" />
                                        Upload images
                                    </label>
                                </div>




                                <div className={`form-check form-switch ps-0 justify-content-between align-items-center d-flex pt-4 ${style.soldOutDiv}`}>
                                    <span className={`mt-1 ms-1`}>Is Fake </span>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isFake} onChange={()=> setIsFake(!isFake)} />
                                </div>
                            </div>
                            {/* Preview Uploaded Image */}
                            <div className="d-flex flex-column mt-3 gap-2">
                                {images && images.map((img, index) => (
                                    <div key={index} className={`d-flex align-items-center ${style.imagePreview}`}>
                                        <span className="me-2">Img {index + 1}</span>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            style={{ fontSize: '0.5rem', padding: '0.2rem 0.3rem' }}
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
                                if (!images || images.length === 0) setError("Image is required")
                            }}>{loading ? 'Loading...' : (isUpdated ? 'Update' : 'Add')}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}