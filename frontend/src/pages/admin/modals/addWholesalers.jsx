import {Input} from "../../../components/input/input.jsx";
import Button from "../../../components/button/button.jsx";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../../context/themeContext.jsx";
import {data} from "react-router";

export const AddWholesalers = ({product,isUpdated}) => {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const {isDark,setISDark} = useContext(ThemeContext);

    const url = isUpdated ?
        `http://localhost:5001/admin/wholesalers/${product?._id}` :
        'http://localhost:5001/admin/wholesalers'

    const method = isUpdated ? 'PUT' : 'POST';



    useEffect(() => {
        setUsername(product?.userName || '');
        setPhone(product?.phone || '');
        setAddress(product?.address || '');
    },[product])



    function handleOnSubmit(e){
        e.preventDefault();
        const data = { userName: username, password, phone, address };

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError(""); // optional: reset error
                    // ✅ Close thmodal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal5'));
                    modal.hide();
                    // ✅ Optional: Reset form
                    setUsername("");
                    setPassword("");
                    setPhone("");
                    setAddress("");
                }
            })
            .catch(error => {
                console.error("Error uploading wholesaler:", error);
                setError("Something went wrong, please try again");
            });
    }
    return (
        <div className="modal fade" id="exampleModal5" tabIndex="-1" aria-labelledby="exampleModal5Label" aria-hidden="true">
            <div className="modal-dialog">
                <div className={`modal-content ${isDark ? "bg-dark text-white" : "" }`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{isUpdated ? 'Update Wholesaler' : 'Add Wholesaler'}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <div className="modal-body">

                            {/* ✅ Error Message */}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <Input placeholder={'Enter username'} isRequired={true}
                                   label={'Username'} usage={'modal'} value={username} onChange={(e) => setUsername(e.target.value)} required />

                            <div className="mt-3">
                                <Input placeholder={'Enter password'} isRequired={true}
                                       label={'Password'} usage={'modal'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>

                            <div className="mt-3">
                                <Input placeholder={'Enter phone'} isRequired={true}
                                       label={'Phone'} usage={'modal'} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>

                            <div className="mt-3">
                                <Input placeholder={'Enter address'} isRequired={true}
                                       label={'Address'} usage={'modal'} value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>

                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <Button variant={'secondary'} size={'lg'} type='submit'>{isUpdated ? 'Update' : 'Register'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}