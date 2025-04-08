import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../../context/themeContext.jsx";

const ConfirmationModal = ({deletedItem, id,itemId}) => {

    const [showToast, setShowToast] = useState(false);
    const {isDark,setIsDark} = useContext(ThemeContext);

    const handleDelete = async (deletedItem, itemId) => {
        try {
            const response = await fetch(`http://localhost:5001/admin/${deletedItem}${deletedItem !== 'categories' ? 's' : ''}/${itemId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to delete ${deletedItem}`);
            }
            const modalElement = document.getElementById(id);
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
            setShowToast(true);

            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error(`Error deleting ${deletedItem}:`, error.message);
            alert(error.message);
        }
    };
    return(
        <>
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`modalTitle-${id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`modal-content ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id={`modalTitle-${id}`}>Delete {deletedItem}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this {deletedItem} ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(deletedItem, itemId)}>confirm delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toast Notification */}
            <div className={`toast-container position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
                <div className={`toast align-items-center text-bg-success border-0 ${showToast ? "show" : "hide"}`}>
                    <div className="d-flex">
                        <div className="toast-body">
                            {deletedItem} deleted successfully!
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
    );
}

export default ConfirmationModal;