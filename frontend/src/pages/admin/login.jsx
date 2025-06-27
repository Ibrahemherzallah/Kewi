import {Input} from "../../components/input/input.jsx";
import style from "./style/logIn.module.css";
import Button from '../../components/button/button.jsx';
import logo from '../../assets/adminlogo.jpg';
import logo2 from '../../assets/logo.png';
import {useContext, useEffect, useState} from "react";
import Typography from "../../components/typography/typography.jsx";
import {Link} from "react-router";
import {UserContext} from "../../context/userContext.jsx";
import {ThemeContext} from "../../context/themeContext.jsx";
const LogIn = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const {isDark,setIsDark} = useContext(ThemeContext);
    useEffect(() => {
        setIsDark(false);
    })
    function handleSubmitForm(e) {
        e.preventDefault();
        fetch('https://kewi.ps/auth/login',{
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
                    setShowToast(true);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = data.redirectUrl;
                }

            }).catch(error => console.error("Error:", error));
    }

    return (
        <>
            <div className={`bg-white d-flex ${style.loginPage}`}>
                <div className={`d-flex justify-content-center align-items-center ${style.form}`}>
                    <form className={`bg-white gap-4 ${style.loginForm}`} onSubmit={handleSubmitForm}>
                        <img src={logo2} className={style.formLogo} alt="logo" />
                        <Typography component={'h1'} variant={'primary'} size={'xl'}>Kewi Login</Typography>
                        <Input placeholder={"Enter you username"} usage={'form'} label={'Username'} size={'xl'} variant={'primary'} required onChange={(e) =>setUsername(e.target.value)} />
                        <Input placeholder={"Enter your password"} usage={'form'} label={'Password'} size={'xl'} variant={'primary'} required type={'password'} onChange={(e) => setPassword(e.target.value)} />
                        <Button variant={'primary'} type={'submit'} size={'xl'}>Login</Button>
                    </form>
                </div>
                <div className={`d-flex justify-content-center align-items-center w-50 position-relative ${style.logo}`}>
                    <img className={`${style.icon}`} src={logo} alt={'logo'}/>
                    {/*<div className={`position-absolute ${style.hr} `}></div>*/}
                </div>
            </div>

            {/* Toast Notification */}
            <div className={`toast-container position-fixed top-0 end-0 p-3`} style={{ zIndex: 1050 }}>
                <div className={`toast align-items-center text-bg-success border-0 ${showToast ? "show" : "hide"}`}>
                    <div className="d-flex">
                        <div className="toast-body">
                            Login successful!!
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

    )
}

export default LogIn;