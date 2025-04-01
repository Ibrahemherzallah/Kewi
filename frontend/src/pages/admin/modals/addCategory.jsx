import {Input, InputTextarea} from "../../../components/input/input.jsx";
import style from "./modals.module.css";
import {FaUpload} from "react-icons/fa";
import {useEffect, useState} from "react";
import Button from "../../../components/button/button.jsx";

export const AddCategoryModal = ({product,isUpdated}) => {

    const [images, setImages] = useState('');
    const [categoryName, setCategoryName] = useState();
    const [description,setDescription] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        setCategoryName(product?.name || '');
        setDescription(product?.description || '');
        setImages(product?.images || '');
    },[product])

    console.log("The product is : " , product)
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get only the first selected file

        if (!file) return; // If no file is selected, do nothing

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
        `http://localhost:5001/admin/categories/${product?._id}` :
        'http://localhost:5001/admin/categories'

    const method = isUpdated ? 'PUT' : 'POST';
    function handleOnSubmit (e){

        e.preventDefault();
        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("description", description);
        formData.append("image", images[0].file);

        console.log("imageeeeeeeeeeeee", images[0].file);

        fetch(url, {
            method: method,
            body: formData, // Send FormData
        })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setError(data.error)
                }
                else{
                    console.log("Category uploaded successfully:", data);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal3'));
                    modal.hide();
                }
            })
            .catch(error => {
                console.error("Error uploading product:", error);
            });
    }
    console.log("The image is  : " , images);
    return (
        <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModal3Label"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{isUpdated ? 'Update Category' : 'Add Category'}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <Input placeholder={'Enter category name'} isRequired={true}
                                   label={'Category Name'} usage={'modal'} required value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} />
                            <div className={`mt-2`}>
                                <InputTextarea placeholder={'Plz enter category description'} isRequired={false} label={'Description'} usage={'modal'} size={'xl'}  style={{ height: '4rem' }} value={description} onChange={(e)=>{setDescription(e.target.value)}}  />
                            </div>
                            <div className={`mt-2 ${style.fileUpload}`}>
                                <input type='file' id="fileInputCategory"
                                       accept="image/*"
                                       multiple
                                       onChange={handleFileChange}
                                       hidden/>
                                <label htmlFor="fileInputCategory">
                                    <FaUpload className="upload-icon" />
                                    Upload images
                                </label>
                            </div>

                            {/* Preview Uploaded Image */}
                            <div className="d-flex mt-3">
                                {images.length > 0 && (
                                    <div className={`${style.imagePreview}`}>
                                        <img src={images[0].url} alt="Preview" className="img-thumbnail me-2" style={{ width: 50, height: 50 }} />
                                        <button type="button" className="btn btn-danger btn-sm"
                                                style={{ fontSize: '0.5rem', padding: '0.2rem 0.3rem' }}
                                                onClick={() => setImages('')}>
                                            X
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <Button variant={'secondary'} size={'xxs'} type='submit' onClick={()=>{
                                if(!images) setError("Image is required")
                            }}>{isUpdated ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}