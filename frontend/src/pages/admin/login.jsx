import {Input} from "../../components/input/input.jsx";
import style from "./style/logIn.module.css";
import Button from '../../components/button/button.jsx';
import logo from '../../assets/adminlogo.jpeg';
import {useState} from "react";
import Typography from "../../components/typography/typography.jsx";
import {Link} from "react-router";
const LogIn = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmitForm(e) {
        e.preventDefault();
        fetch('http://localhost:5001/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName, password})
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Login successful!");
                    window.location.href = data.redirectUrl;
                }
            }).catch(error => console.error("Error:", error));
    }
    return (
        <div className="d-flex">
            <div className={`d-flex bg-info justify-content-center align-items-center w-50 ${style.form}`}>
                <form className="bg-white gap-4 p-4 py-5" onSubmit={handleSubmitForm}>
                    <Typography component={'h1'} variant={'primary'} size={'xl'}>Kewi Admin</Typography>
                    <Input placeholder={"Enter you username"} usage={'form'} label={'Username'} size={'xl'} variant={'primary'} onChange={(e) =>setUsername(e.target.value)} />
                    <Input placeholder={"Enter your email"} usage={'form'} label={'Password'} size={'xl'} variant={'primary'} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant={'primary'} type={'submit'} size={'xl'}>Login</Button>
                </form>
            </div>
            <div className={`d-flex justify-content-center align-items-center w-50 position-relative bg-dark ${style.logo}`}>
                <img className={`${style.icon}`} src={logo} alt={'logo'}/>
                <div className={`position-absolute ${style.hr} `}></div>
            </div>
        </div>
    )
}

export default LogIn;