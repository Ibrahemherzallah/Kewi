import {Input, InputTextarea} from "../../../components/input/input.jsx";
import style from "./modals.module.css";
import {FaUpload} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import Button from "../../../components/button/button.jsx";
import {ThemeContext} from "../../../context/themeContext.jsx";

export const AddCategoryModal = ({product,isUpdated}) => {

    const [images, setImages] = useState();
    const [categoryName, setCategoryName] = useState();
    const [description,setDescription] = useState();
    const [error, setError] = useState('');
    const {isDark,setISDark} = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCategoryName(product?.name || '');
        setDescription(product?.description || '');
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
        `https://kewi.ps/admin/categories/${product?._id}` :
        'https://kewi.ps/admin/categories'

    const method = isUpdated ? 'PUT' : 'POST';
    function handleOnSubmit (e){
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("description", description);
        formData.append("image", images[0].file);


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
                    window.location.reload();

                }
            })
            .catch(error => {
                console.error("Error uploading product:", error);
            }).finally(() => {
            setLoading(false); // Stop loading
        });
    }

    useEffect(() => {
        // Add iOS-specific styles
        const style = document.createElement('style');
        style.textContent = `
      @supports (-webkit-touch-callout: none) {
        .modal {
          -webkit-overflow-scrolling: touch;
        }
        
        .modal-dialog {
          max-height: 100%;
          overflow-y: auto;
        }
        
        .modal-content {
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .modal-backdrop {
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        body.modal-open {
          position: fixed;
          width: 100%;
        }
      }
      
      /* General modal fixes */
.modal-content {
    opacity: 1 !important;
    transform: translateZ(0) !important;
    -webkit-transform: translateZ(0) !important;
}

/* Fix for backdrop on iOS */
.modal-backdrop.show {
    opacity: 0.5 !important;
}

/* Dark mode support */
.modal-content.bg-dark {
    background-color: #212529 !important;
    color: #fff !important;
}

.modal-content.bg-dark .btn-close {
    filter: invert(1) grayscale(100%) brightness(200%);
}
`;
        document.head.appendChild(style);

        // Clean up function
        return () => {
            document.head.removeChild(style);
        };
    }, []);





    return (
        <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModal3Label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModal3Label">{isUpdated ? 'Update Category' : 'Add Category'}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                    <form onSubmit={handleOnSubmit}>
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
                        <div className="modal-footer d-flex justify-content-center">

                            <Button variant={'secondary'} size={'xxs'} type='submit' onClick={()=>{
                                if (!images || images.length === 0) setError("Image is required")
                            }}>{loading ? 'Loading...' : (isUpdated ? 'Update' : 'Add')}</Button>
                        </div>
                    </form>
                    </div>

                </div>
            </div>
        </div>
    )
}